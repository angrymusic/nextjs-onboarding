"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitFeedback, type FeedbackActionState } from "./actions";

const initialState: FeedbackActionState = {
  status: "idle",
  message: "",
};

export default function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(
    submitFeedback,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" name="name" autoComplete="name" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">내용</Label>
        <textarea
          id="content"
          name="content"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          placeholder="학습 과정에 대한 의견을 남겨 주세요."
        />
      </div>

      <div className="flex flex-col items-end gap-3">
        <Button type="submit" variant="brand" disabled={isPending}>
          {isPending ? "제출 중..." : "제출"}
        </Button>
        <p
          aria-live="polite"
          className={`min-h-5 text-sm ${
            state.status === "error"
              ? "text-destructive"
              : state.status === "success"
                ? "text-emerald-700"
                : ""
          }`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
