"use server";

import { addFeedback } from "@/lib/db";

export type FeedbackActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitFeedback(
  _previousState: FeedbackActionState,
  formData: FormData,
): Promise<FeedbackActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (content.length < 5) {
    return { status: "error", message: "내용을 5자 이상 입력해 주세요." };
  }

  addFeedback({ name, content });
  return { status: "success", message: "피드백이 제출되었습니다." };
}
