"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitEventHandler, useState } from "react";

type CreateItemRequest = {
  name: string;
  category: string;
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

export default function CreateItemForm() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("server");
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
      <form
        className="flex flex-wrap items-end gap-2.5"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm">이름</span>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded border px-2.5 py-1.5"
            placeholder="아이템 이름"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">카테고리</span>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded border px-2.5 py-1.5"
          >
            <option value="server">server</option>
            <option value="client">client</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">가격</span>

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="rounded border px-2.5 py-1.5"
            placeholder="가격"
            min="0"
            required
          />
        </label>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="rounded bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {createMutation.isPending ? "추가 중..." : "추가"}
        </button>
      </form>

      {createMutation.isError && (
        <p className="mt-2 text-sm text-red-600">
          {createMutation.error.message}
        </p>
      )}
    </section>
  );
}
