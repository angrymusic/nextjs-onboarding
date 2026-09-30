"use server";

import { addFeedback } from "@/lib/db";

const MAX_NAME_LENGTH = 50;
const MAX_CONTENT_LENGTH = 1000;

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

  if (!name) {
    return { status: "error", message: "이름을 입력해 주세요." };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return {
      status: "error",
      message: `이름은 ${MAX_NAME_LENGTH}자 이하로 입력해 주세요.`,
    };
  }

  if (content.length < 5) {
    return { status: "error", message: "내용을 5자 이상 입력해 주세요." };
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    return {
      status: "error",
      message: `내용은 ${MAX_CONTENT_LENGTH}자 이하로 입력해 주세요.`,
    };
  }

  addFeedback({ name, content });
  return { status: "success", message: "피드백이 제출되었습니다." };
}
