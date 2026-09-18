export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold">Next.js 온보딩 학습 repo</h1>
      <p className="mt-2 text-muted-foreground">
        과제는 <code className="rounded bg-muted px-1">docs/curriculum.md</code>{" "}
        참고. 과제별 작업은 이 repo 위에 브랜치를 파서 진행한다.
      </p>

      <section className="mt-8 space-y-2 text-sm">
        <h2 className="font-semibold">준비된 것</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Next 15 App Router + TypeScript + Tailwind</li>
          <li>
            shadcn/ui 초기화 완료 (예시:{" "}
            <code>src/components/ui/button.tsx</code>)
          </li>
          <li>
            TanStack Query Provider (<code>src/app/providers.tsx</code>)
          </li>
          <li>
            zustand, @tanstack/react-table 설치됨 (아직 사용처 없음 — 과제에서
            사용)
          </li>
          <li>
            Mock API: <code>GET/POST /api/items</code>,{" "}
            <code>GET/PATCH/DELETE /api/items/:id</code> (페이징·정렬 지원,
            인위적 500ms 지연)
          </li>
        </ul>
      </section>
    </main>
  );
}
