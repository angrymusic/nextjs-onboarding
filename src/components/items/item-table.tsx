"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Item } from "@/lib/db";
import { formatDate, formatNumber } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

type ItemTableProps = {
  data: Item[];
  onDelete: (id: number) => void;
  isDeleting: boolean;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  pageCount: number;
};

export default function ItemTable({
  data,
  onDelete,
  isDeleting,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  pageCount,
}: ItemTableProps) {
  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <Link href={`/items/${row.original.id}`} className="hover:underline">
            {row.original.id}
          </Link>
        ),
      },
      {
        accessorKey: "name",
        header: "이름",
        cell: ({ row }) => (
          <Link href={`/items/${row.original.id}`} className="hover:underline">
            {row.original.name}
          </Link>
        ),
      },
      {
        accessorKey: "category",
        header: "카테고리",
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="-ml-2"
            onClick={column.getToggleSortingHandler()}
          >
            가격
            {column.getIsSorted() === "asc" ? (
              <ArrowUp aria-hidden="true" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown aria-hidden="true" />
            ) : (
              <ArrowDownUp aria-hidden="true" />
            )}
          </Button>
        ),
        cell: ({ row }) => `${formatNumber(row.original.price)}원`,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            className="-ml-2"
            onClick={column.getToggleSortingHandler()}
          >
            등록일
            {column.getIsSorted() === "asc" ? (
              <ArrowUp aria-hidden="true" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown aria-hidden="true" />
            ) : (
              <ArrowDownUp aria-hidden="true" />
            )}
          </Button>
        ),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(row.original.id)}
            disabled={isDeleting}
          >
            삭제
          </Button>
        ),
      },
    ],
    [isDeleting, onDelete],
  );

  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onPaginationChange,
    onSortingChange,
    manualPagination: true,
    manualSorting: true,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                표시할 아이템이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-3 border-t p-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          이전
        </Button>
        <span className="text-sm" aria-live="polite">
          {pageCount === 0 ? 0 : pagination.pageIndex + 1} / {pageCount}
        </span>
        <Button
          type="button"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
