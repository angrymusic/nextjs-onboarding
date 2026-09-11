# 과제 5. Zustand — 클라이언트 UI 상태 (가벼움, 반나절)

## 목표

**UI 상태만** zustand로. 서버 데이터가 store에 들어오면 리젝.

**Vue 매핑**: Pinia와 거의 1:1. 문법보다 "무엇을 넣고 무엇을 안 넣는가" 경계가 학습 포인트.

## 선행 docs (숙지 후 진행)

- [Zustand 공식 docs — Introduction](https://zustand.docs.pmnd.rs/getting-started/introduction) (사내망에서 안 열리면 [GitHub README](https://github.com/pmndrs/zustand))

## 요구사항

- `src/stores/item-filter.ts` 생성:

```ts
type ItemFilterState = {
  category: "all" | "server" | "client" | "shared";
  keyword: string;
  setCategory: (c: ItemFilterState["category"]) => void;
  setKeyword: (k: string) => void;
};
```

- `/items` 목록 위에 필터 바 추가: 카테고리 탭 4개 + 검색 input
- `item-list.tsx`는 **selector로 구독** (`useItemFilter(s => s.category)` 형태 — store 통째 구독 금지)
- 필터링은 클라이언트에서: useQuery로 받은 rows를 category/keyword로 filter (API 재요청 아님 — 이 선택의 트레이드오프를 질문에서 다룸)

## 와이어프레임

```
┌──────────────────────────────────────────┐
│ 아이템 목록                               │
│ [전체] [server] [client] [shared]  🔍[__] │  ← zustand
│                                          │
│  아이템 1   server   1,000원  [삭제]      │
│  아이템 4   server   4,000원  [삭제]      │
│  (server 탭 선택 시 server만)              │
└──────────────────────────────────────────┘
```

## 완료 조건

- [ ] store에 UI 상태만 있음 (rows/서버 응답 없음)
- [ ] selector 구독 — 검색어 타이핑 시 카테고리 탭 컴포넌트가 리렌더되지 않음 (React DevTools highlight로 확인, PR에 확인 방법 기록)
- [ ] 필터 + 검색 동시 적용 동작

## 체크 질문

1. 이 상태는 왜 zustand에 있고, 목록 데이터는 왜 query에 있는가? ← 핵심 질문
2. selector 없이 store 통째로 구독하면 어떤 문제?
3. zustand store를 서버 컴포넌트에서 읽을 수 있는가? 왜?
4. 필터를 클라이언트 filter 대신 서버(API 파라미터)로 옮긴다면 무엇이 바뀌는가? (queryKey, 로딩 상태, 데이터량) — 과제 7에서 실제로 서버 쪽으로 감
