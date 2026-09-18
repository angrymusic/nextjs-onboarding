# 과제 7. TanStack Table — 서버 페이징 테이블

## 목표

headless table + **서버 사이드 페이징/정렬** (실무 프로젝트 패턴). 과제 4~5의 목록을 테이블로 교체한다.

## 선행 docs (숙지 후 진행)

- [TanStack Table — Overview](https://tanstack.com/table/v8/docs/introduction)
- [Pagination Guide](https://tanstack.com/table/v8/docs/guide/pagination) ← manual(서버) 페이징 섹션
- [Sorting Guide](https://tanstack.com/table/v8/docs/guide/sorting)
- [TanStack Query — Paginated Queries](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries) ← `keepPreviousData` 여기 나옴

## 요구사항

### A. 테이블 전환

- `src/components/item-table.tsx` 생성, `useReactTable` 사용
- 컬럼: ID / 이름 / 카테고리 / 가격(정렬 가능) / 등록일(정렬 가능) / [삭제]
- `ColumnDef` 배열은 **컴포넌트 밖** 또는 `useMemo`
- 렌더링은 shadcn 스타일의 `<table>` 직접 마크업 (`pnpm dlx shadcn add table` 사용 가능)

### B. 서버 페이징 + 정렬

- `manualPagination: true`, `manualSorting: true`
- 페이징/정렬 상태 변경 → queryKey에 반영 → API 재요청:

```ts
useQuery({
  queryKey: ["items", { page, pageSize, sort, desc }],
  queryFn: () =>
    fetch(
      `/api/items?page=${page}&pageSize=${pageSize}&sort=${sort}&desc=${desc}`,
    ).then((r) => r.json()),
  placeholderData: keepPreviousData, // 페이지 넘길 때 깜빡임 방지 — 있고 없고 비교해볼 것
});
```

- API가 주는 `total`로 전체 페이지 수 계산, 하단 페이지네이션 (이전/다음 + 페이지 표시)
- 이 단계에서 과제 5의 카테고리/검색 필터는 일단 현재 페이지 내 클라이언트 필터로 유지 — B까지 되면 커밋하고, 카테고리가 "현재 페이지 안에서만" 걸리는 한계를 직접 확인해볼 것 (server 탭인데 다른 페이지의 server 아이템이 안 보임)

### C. 카테고리 필터를 서버 필터로 전환

B에서 확인한 한계를 해소한다. 검색어(keyword)는 **일부러 클라이언트 필터로 남긴다** — 두 방식이 한 화면에 공존하며 차이를 체감하는 게 목적.

- `src/lib/db.ts`의 `list()`에 `category` 옵션 추가 — **필터 → 정렬 → 페이징 순서**, `total`은 필터 적용 후 개수
- `GET /api/items`에 `category` 파라미터 추가
- zustand의 category를 queryKey에 포함 + fetch 파라미터로 전달, 클라이언트 filter에서는 category 제거
- **카테고리가 바뀌면 pageIndex를 0으로 리셋** — 리셋 안 하면 어떤 일이 나는지 먼저 재현해볼 것 (3페이지에서 카테고리 클릭 → 빈 목록)

## 와이어프레임

```
┌────────────────────────────────────────────────┐
│ [전체][server][client][shared]  🔍[__] [+새아이템] │
├────────────────────────────────────────────────┤
│ ID │ 이름     │ 카테고리 │ 가격 ▲│ 등록일   │    │
│  3 │ 아이템 3 │ shared  │ 3,000 │ 09-08   │[삭제]│
│  7 │ 아이템 7 │ server  │ 7,000 │ 09-04   │[삭제]│
│ ...│         │         │       │         │     │
├────────────────────────────────────────────────┤
│              [← 이전]  2 / 2  [다음 →]           │
└────────────────────────────────────────────────┘
```

## 완료 조건

- [ ] 가격/등록일 헤더 클릭 → 정렬 방향 토글, **API 요청이 다시 나감** (Network 탭 확인)
- [ ] 페이지 이동 시 목록 전체가 사라졌다 나타나지 않음 (keepPreviousData)
- [ ] 아이템 추가/삭제 후 현재 페이지 갱신
- [ ] 컬럼 정의가 렌더마다 재생성되지 않음
- [ ] (C) 카테고리 클릭 → **API 재요청** + `total`/페이지 수가 해당 카테고리 기준으로 바뀜
- [ ] (C) 카테고리 변경 시 1페이지로 리셋
- [ ] (C) 검색어는 여전히 현재 페이지 안에서만 걸림 (의도된 차이)

## 체크 질문

1. headless가 무슨 뜻인가? 렌더링은 누가 하나?
2. 페이지가 바뀔 때 queryKey는 어떻게 되나? 이전 페이지 데이터는 어디 있나?
3. 컬럼 정의를 컴포넌트 밖(또는 useMemo)에 두는 이유는?
4. 정렬 상태는 table 내부 상태인가, 우리가 관리하는 상태인가? manualSorting이 바꾸는 것은?
5. (C에서 직접 했음) 카테고리를 서버 필터로 옮기면서 바뀐 곳을 전부 나열해보라 (db → API → queryKey → 클라 filter 제거 → 페이지 리셋). 같은 방식으로 keyword까지 서버로 옮긴다면 추가로 뭘 고려해야 하나? (타이핑마다 재요청 → debounce)
6. 카테고리 변경 시 pageIndex를 리셋하지 않으면 왜 빈 목록이 나오나? total이 줄었는데 pageIndex가 남아 있으면 무슨 요청이 나가나?
