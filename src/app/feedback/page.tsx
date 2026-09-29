import FeedbackForm from "./feedback-form";

export default function FeedbackPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">학습 피드백</h1>
      <FeedbackForm />
    </main>
  );
}
