"use client";
import type { Item } from "@/lib/db";
import { formatNumber } from "@/lib/utils";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import CreateItemForm from "./create-item-form";

type ItemsResponse = {
  rows: Item[];
};

export default function ItemList() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, refetch } = useQuery<ItemsResponse>({
    queryKey: ["items", { page: 1, pageSize: 10 }],
    queryFn: async () => {
      const response = await fetch("/api/items?page=1&pageSize=10");

      if (!response.ok) {
        throw new Error("아이템 목록을 불러오지 못했습니다.");
      }

      return response.json();
    },
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
        <button type="button" onClick={() => refetch()}>
          재시도
        </button>
      </div>
    );
  }
  return (
    <div>
      <CreateItemForm />
      <h1 className="pb-2.5">아이템 목록</h1>
      <ul className="flex flex-col gap-2.5">
        {data.rows.map((item) => {
          return (
            <li key={item.id}>
              <Link href={`/items/${item.id}`} className="flex gap-2.5">
                <span>{item.name}</span>
                <span>{item.category}</span>
                <span>{formatNumber(item.price)}원</span>
                <button
                  type="button"
                  onClick={(e) => {
                    deleteMutation.mutate(item.id);
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  disabled={deleteMutation.isPending}
                >
                  [삭제]
                </button>
                <span> → </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
