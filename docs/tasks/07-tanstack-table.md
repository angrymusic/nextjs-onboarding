# 과제 7. TanStack Table — 서버 페이징 테이블

## 목표

headless table + **서버 사이드 페이징/정렬** (실무 프로젝트 패턴). 과제 4~5의 목록을 테이블로 교체한다.

## 요구사항

### A. 테이블 전환

- `src/components/item-table.tsx` 생성, `useReactTable` 사용
- 컬럼: ID / 이름 / 카테고리 / 가격(정렬 가능) / 등록일(정렬 가능) / [삭제]
- `ColumnDef` 배열은 **컴포넌트 밖** 또는 `useMemo` (이유를 질문에서 다룸)
- 렌더링은 shadcn 스타일의 `<table>` 직접 마크업 (`pnpm dlx shadcn add table` 사용 가능)

### B. 서버 페이징 + 정렬

- `manualPagination: true`, `manualSorting: true`
- 페이징/정렬 상태 변경 → queryKey에 반영 → API 재요청:

```ts
useQuery({
  queryKey: ['items', { page, pageSize, sort, desc }],
  queryFn: () => fetch(`/api/items?page=${page}&pageSize=${pageSize}&sort=${sort}&desc=${desc}`).then(r => r.json()),
  placeholderData: keepPreviousData,   // 페이지 넘길 때 깜빡임 방지 — 있고 없고 비교해볼 것
})
```

- API가 주는 `total`로 전체 페이지 수 계산, 하단 페이지네이션 (이전/다음 + 페이지 표시)
- 과제 5의 카테고리/검색 필터는 현재 페이지 내 클라이언트 필터로 유지 (한계를 질문에서 다룸)

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

## 체크 질문

1. headless가 무슨 뜻인가? 렌더링은 누가 하나?
2. 페이지가 바뀔 때 queryKey는 어떻게 되나? 이전 페이지 데이터는 어디 있나?
3. 컬럼 정의를 컴포넌트 밖(또는 useMemo)에 두는 이유는?
4. 정렬 상태는 table 내부 상태인가, 우리가 관리하는 상태인가? manualSorting이 바꾸는 것은?
5. 카테고리 필터가 "현재 페이지 안에서만" 걸리는 게 지금 구조의 한계다. 서버 필터로 옮기려면 어디를 바꿔야 하나? (API, queryKey, zustand 연결)
