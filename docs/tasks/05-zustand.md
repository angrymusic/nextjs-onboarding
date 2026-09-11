# 과제 5. Zustand — 클라이언트 UI 상태 (가벼움, 반나절)

## 목표

**UI 상태만** zustand로. 서버 데이터가 store에 들어오면 리젝.

**Vue 매핑**: Pinia와 거의 1:1. 문법보다 "무엇을 넣고 무엇을 안 넣는가" 경계가 학습 포인트.

## 선행 docs (숙지 후 진행)

- [Zustand 공식 docs — Introduction](https://zustand.docs.pmnd.rs/getting-started/introduction)

## 요구사항

### A. zustand 없이 먼저 — useState 버전으로 동작 확인

- 필터 바를 `src/components/item-filter-bar.tsx`로 분리 (카테고리 탭 4개 + 검색 input)
- 필터 바와 목록을 감싸는 부모 client 컴포넌트에서 `useState`로 category/keyword를 들고 **props로 내려서** 필터링 동작까지 완성
- 상태를 두 컴포넌트의 공통 부모까지 끌어올려야 함 (lifting)
- 부모→자식으로 props 배선이 생김 (drilling — 지금은 한 단계지만 깊어지면?)
- keyword 타이핑마다 부모가 리렌더 → 목록까지 같이 리렌더
- 이 상태로 커밋 (B 진행 후 diff에서 뭐가 수정됐는지 보이게)

### B. zustand로 전환

- `src/stores/item-filter.ts` 생성:

```ts
type ItemFilterState = {
  category: "all" | "server" | "client" | "shared";
  keyword: string;
  setCategory: (c: ItemFilterState["category"]) => void;
  setKeyword: (k: string) => void;
};
```

- A의 useState/props 배선 제거 — 필터 바와 목록이 각자 store를 직접 구독 (부모의 상태 중계가 사라지는 걸 확인)
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

- [ ] A 단계(useState 버전) B 단계 두단계로 구현하여 zustand 효과 체감
- [ ] store에 UI 상태만 있음 (rows/서버 응답 없음)
- [ ] selector 구독 — 검색어 타이핑 시 카테고리 탭 컴포넌트가 리렌더되지 않음 (React DevTools highlight로 확인, PR에 확인 방법 기록)
- [ ] 필터 + 검색 동시 적용 동작

## 체크 질문

1. 이 상태는 왜 zustand에 있고, 목록 데이터는 왜 query에 있는가? ← 핵심 질문
2. selector 없이 store 통째로 구독하면 어떤 문제?
3. zustand store를 서버 컴포넌트에서 읽을 수 있는가? 왜?
4. 필터를 클라이언트 filter 대신 서버(API 파라미터)로 옮긴다면 무엇이 바뀌는가? (queryKey, 로딩 상태, 데이터량) — 과제 7에서 실제로 서버 쪽으로 감
