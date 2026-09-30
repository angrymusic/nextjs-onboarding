import { listFeedbacks } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function FeedbackListPage() {
  const feedbacks = listFeedbacks();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">저장된 피드백</h1>

      {feedbacks.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          아직 등록된 피드백이 없습니다.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {feedbacks.map((feedback, index) => (
            <li
              key={`${feedback.createdAt}-${index}`}
              className="py-5 first:pt-0 last:pb-0"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-medium">{feedback.name}</h2>
                <time
                  dateTime={feedback.createdAt}
                  className="text-sm text-muted-foreground"
                >
                  {new Date(feedback.createdAt).toLocaleString("ko-KR")}
                </time>
              </div>
              <p className="whitespace-pre-wrap break-words text-sm leading-6">
                {feedback.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
