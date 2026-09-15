# 과제 8. 서버 액션 (가벼움, 반나절)

## 목표

실무 프로젝트에 한 군데 있는 패턴 — 읽고 따라 만들 수준이면 충분.

**Spring 매핑**: 컨트롤러 엔드포인트가 함수로 인라인된 것. import해서 호출하는 것처럼 보여도 **실제 네트워크 요청이 나간다.**

## 선행 docs (숙지 후 진행)

- [Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [use server 지시어](https://nextjs.org/docs/app/api-reference/directives/use-server)
- [React — useActionState](https://react.dev/reference/react/useActionState)

## 요구사항

- `/feedback` 페이지 신설: 이 학습 과정 피드백 폼 (이름 / 내용 textarea)
- `src/app/feedback/actions.ts` — `'use server'`, `submitFeedback` 액션:
  - 검증: 내용 5자 미만이면 에러 반환
  - 저장: `src/lib/db.ts`에 `feedbacks` 배열 + `addFeedback()` 직접 추가 (db.ts 확장도 과제)
- 폼은 `useActionState`로 연결: 제출 중 pending 표시, 성공/에러 메시지 표시
- **query/mutation 사용 금지** — 이 페이지만큼은 서버 액션 경로로

## 와이어프레임

```
┌────────────────────────────────────┐
│ GNB   [Items] [About] [Feedback]   │
├────────────────────────────────────┤
│ 학습 피드백                         │
│ 이름   [__________]                 │
│ 내용   [__________________]         │
│        [__________________]         │
│                     [제출]          │
│                                    │
│ ✓ 제출 완료  /  ✗ 내용이 너무 짧습니다 │
└────────────────────────────────────┘
```

## 완료 조건

- [ ] 제출 성공/검증 실패 메시지 표시
- [ ] 제출 시 DevTools Network 탭에서 POST 요청 확인

## 체크 질문

1. `submitFeedback`은 어디서 실행되나? 클라이언트에서 import했는데 왜 서버 코드가 안 새나?
2. 서버 액션 vs API Route(route handler) — 차이와 각각 언제 쓰나? 
3. 서버 액션의 인자/반환값에 아무거나 넘겨도 되나? (직렬화 제약)
