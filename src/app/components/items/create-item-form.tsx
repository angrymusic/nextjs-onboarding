"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item } from "@/lib/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitEventHandler, useState } from "react";

type CreateItemRequest = {
  name: string;
  category: Item["category"];
  price: number;
};

async function createItem(item: CreateItemRequest) {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("아이템을 생성하지 못했습니다.");
  }

  return response.json();
}

type CreateItemFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function CreateItemForm({ onSuccess, onCancel }: CreateItemFormProps) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<Item["category"]>("server");
  const [price, setPrice] = useState("");

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["items"],
      });

      setName("");
      setCategory("server");
      setPrice("");
      onSuccess?.();
    },
  });

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    createMutation.mutate({
      name: name.trim(),
      category,
      price: Number(price),
    });
  };

  return (
    <section className="mb-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-[80px_1fr] items-center gap-3">
          <Label htmlFor="name">이름</Label>

          <Input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="아이템 이름"
            required
          />
        </div>

        <div className="grid grid-cols-[80px_1fr] items-center gap-3">
          <Label htmlFor="category">카테고리</Label>

          <Select
            value={category}
            onValueChange={(value) => setCategory(value as Item["category"])}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="server">server</SelectItem>
              <SelectItem value="client">client</SelectItem>
              <SelectItem value="shared">shared</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-[80px_1fr] items-center gap-3">
          <Label htmlFor="price">가격</Label>

          <Input
            id="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="가격"
            min="0"
            required
          />
        </div>

        {createMutation.isError && (
          <p className="text-sm text-red-600">{createMutation.error.message}</p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={createMutation.isPending}
          >
            취소
          </Button>

          <Button
            type="submit"
            variant="brand"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "추가 중..." : "추가"}
          </Button>
        </div>
      </form>

      {createMutation.isError && (
        <p className="mt-2 text-sm text-red-600">
          {createMutation.error.message}
        </p>
      )}
    </section>
  );
}
