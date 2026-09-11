# 과제 4. TanStack Query CRUD

## 목표

서버 상태 멘탈모델 전환: **서버 데이터는 query 캐시가 소유한다. store에 복사하지 않는다.**

실무 프로젝트는 데이터 페칭이 query 중심이다. 과제 2에서 서버 컴포넌트로 페칭했던 `/items` 목록을 이번에 클라이언트 페칭으로 **전환**한다 — 전환 자체가 두 방식의 차이를 익히는 과정.

**Vue 매핑 (최대 습관 차이)**: Pinia에 API 응답을 넣고 컴포넌트가 store를 읽던 방식 금지. query가 캐시 = 저장소.

## 선행 docs (숙지 후 진행)

- [Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start)
- [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Query Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)

## 요구사항

### A. 목록을 useQuery로 전환

- `src/app/items/page.tsx`는 얇은 서버 컴포넌트로 두고, 목록 부분을 `src/components/item-list.tsx`(`'use client'`)로 분리
- `useQuery({ queryKey: ['items', ...], queryFn })` — `fetch('/api/items?...')` 사용 (이제 `db` 직접 호출 아님. 왜인지 설명할 수 있어야 함)
- `isPending` → 스켈레톤 또는 "불러오는 중", `isError` → 에러 메시지 + 재시도 버튼 (`refetch`)
- mock API에 500ms 지연이 있어서 로딩 상태가 눈에 보인다

### B. 생성 폼 + useMutation

- `/items` 페이지 상단에 간단한 인라인 폼: name(text) / category(select) / price(number) — 아직 shadcn 금지, 순수 HTML (과제 6에서 교체)
- `useMutation`으로 `POST /api/items`, 성공 시 `queryClient.invalidateQueries({ queryKey: ['items'] })`
- 요청 중 제출 버튼 disabled

### C. 삭제

- 목록 각 행에 [삭제] 버튼 → `DELETE /api/items/:id` mutation + invalidate

## 와이어프레임

`/items` (과제 4 완료 후):

```
┌──────────────────────────────────────────┐
│ GNB   [Items]  [About]                   │
├──────────────────────────────────────────┤
│ 새 아이템                                 │
│ [이름____] [카테고리▾] [가격__] [추가]      │
├──────────────────────────────────────────┤
│ 아이템 목록                               │
│  아이템 1   server   1,000원  [삭제]  →   │
│  아이템 2   client   2,000원  [삭제]  →   │
│  ...                                     │
│                                          │
│ (로딩 중)  ░░░░░░  ░░░░░░  ░░░░░░         │
│ (에러 시)  불러오기 실패  [재시도]          │
└──────────────────────────────────────────┘
```

## 완료 조건

- [ ] 추가/삭제 후 목록이 **자동 갱신** (수동 refetch 호출 없이 invalidate로)
- [ ] 로딩/에러/재시도 UI 동작 (Network 탭 throttle로 확인)
- [ ] 서버 응답을 useState/zustand에 복사한 곳이 한 군데도 없음
- [ ] queryKey 설계 이유를 PR 설명에 한 줄
- [ ] 모달(과제 3)과 풀페이지 상세는 기존 서버 컴포넌트 유지 — 전환 범위는 목록만

## 체크 질문

1. queryKey는 왜 배열인가? 어떤 기준으로 설계했는가?
2. invalidate는 정확히 무엇을 하는가? refetch와 뭐가 다른가?
3. `staleTime`과 `gcTime`의 차이는? (Provider에 staleTime 30초가 이미 설정돼 있음 — 어떤 영향?)
4. 서버 응답을 zustand에 넣으면 왜 안 되는가? Pinia 때랑 뭐가 달라졌는가?
5. 같은 useQuery를 두 컴포넌트에서 호출하면 요청이 두 번 나가는가?
6. A에서 왜 `db` 직접 호출 대신 `fetch('/api/...')`로 바꿔야 했는가?
