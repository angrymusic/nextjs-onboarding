"use client";
import ItemTable from "@/components/item-table";
import { Button } from "@/components/ui/button";
import type { Item } from "@/lib/db";
import { useItemFilter } from "@/stores/item-filter";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type ItemsResponse = {
  rows: Item[];
  total: number;
  page: number;
  pageSize: number;
};

export default function ItemList() {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const category = useItemFilter((state) => state.category);
  const keyword = useItemFilter((state) => state.keyword);
  useEffect(() => {
    setPagination((current) =>
      current.pageIndex === 0 ? current : { ...current, pageIndex: 0 },
    );
  }, [category]);

  const sort = sorting[0]?.id;
  const desc = sorting[0]?.desc ?? false;
  const { data, isPending, isError, refetch } = useQuery<ItemsResponse>({
    queryKey: [
      "items",
      {
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sort,
        desc,
        category,
      },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(pagination.pageIndex + 1),
        pageSize: String(pagination.pageSize),
        desc: String(desc),
        category,
      });
      if (sort) params.set("sort", sort);
      const response = await fetch(`/api/items?${params}`);

      if (!response.ok) {
        throw new Error("아이템 목록을 불러오지 못했습니다.");
      }

      return response.json();
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const pageCount = Math.ceil((data?.total ?? 0) / pagination.pageSize);
    const lastPageIndex = Math.max(0, pageCount - 1);

    setPagination((current) =>
      current.pageIndex > lastPageIndex
        ? { ...current, pageIndex: lastPageIndex }
        : current,
    );
  }, [data?.total, pagination.pageSize]);

  const normalizedKeyword = keyword.trim().toLowerCase();

  const filteredRows = data?.rows.filter((item) => {
    const matchesKeyword = item.name.toLowerCase().includes(normalizedKeyword);

    return matchesKeyword;
  });

  async function deleteItem(id: number) {
    const response = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("아이템을 삭제하지 못했습니다.");
    }
  }

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });

  if (isPending) {
    return <p>불러오는 중...</p>;
  }
  if (isError) {
    return (
      <div>
        <p>불러오기 실패</p>
        <Button type="button" onClick={() => refetch()}>
          재시도
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-2.5 pb-2.5">
        <span className="pb-2.5">아이템 목록 </span>
        {deleteMutation.isPending && <span>(삭제중...)</span>}
      </div>

      <ItemTable
        data={filteredRows ?? []}
        onDelete={(id) => deleteMutation.mutate(id)}
        isDeleting={deleteMutation.isPending}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={(updater) => {
          setSorting(updater);
          setPagination((current) => ({ ...current, pageIndex: 0 }));
        }}
        pageCount={Math.ceil((data?.total ?? 0) / pagination.pageSize)}
      />
    </div>
  );
}
