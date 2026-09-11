# 과제 3. 모달 = Parallel + Intercepting Route

## 목표

실무 프로젝트의 모달 패턴 그대로: 목록에서 클릭하면 **모달**로 상세, URL 직접 진입/새로고침이면 **풀페이지** 상세.

**Vue 매핑**: parallel route ≈ named `<router-view>`. intercepting은 Vue에 대응 개념 없음 — "**소프트 내비게이션일 때만** 라우트를 가로챈다".

## 선행 docs (숙지 후 진행)

- [Parallel Routes](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes) ← `default.js` 섹션까지 정독
- [Intercepting Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)

## 요구사항 (3단계, 순서대로 커밋)

### (a) Parallel route

```
src/app/
├── layout.tsx          ← modal 슬롯 받도록 수정: { children, modal }
├── @modal/
│   └── default.tsx     ← null 반환
```

- `default.tsx`를 **일부러 빼고** 아무 페이지나 새로고침 → 404 직접 경험 후 추가

### (b) Intercepting 추가

직접 해보고 아래 구조 참고

```
src/app/
├── @modal/
│   ├── default.tsx
│   └── (.)items/
│       └── [id]/
│           └── page.tsx   ← 모달 UI (딤 배경 + 카드)
├── items/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx       ← 기존 풀페이지 (그대로 유지)
```

- 목록에서 `<Link href="/items/1">` 클릭 → 모달, 배경에 목록 유지
- 같은 URL 새로고침 → 풀페이지

### (c) 마무리 동작

- 모달 닫기: 딤 클릭 + [×] 버튼 → `router.back()`
- 모달 내용은 `db.get(id)`로 실데이터 (풀페이지와 동일 데이터, UI만 축약)
- 모달 껍데기는 `src/components/ui/modal.tsx` 공용 컴포넌트로 분리: 딤 배경 + 중앙 카드, 딤/[×] 클릭 → `router.back()`, 카드 내부 클릭은 닫히지 않게 (`stopPropagation`). `useRouter`는 반드시 `next/navigation`에서
- [풀페이지로 보기]는 `<a>` 태그(하드 내비게이션) — `<Link>`면 다시 인터셉트돼서 모달이 또 뜬다

스타일 힌트 (딤/카드 CSS는 과제 범위 아님 — 그대로 가져다 써도 됨):

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  {/* ↑ 딤: 화면 전체 덮기 + 반투명 검정 + 카드 중앙 정렬. 여기에 딤 클릭 닫기 */}
  <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
    {/* ↑ 카드. 여기에 클릭 전파 차단 + [×] 버튼 */}
    {children}
  </div>
</div>
```

## 와이어프레임

`/items/1` — 목록에서 클릭 (소프트 내비게이션):

```
┌────────────────────────────────────┐
│ GNB   [Items]  [About]             │
├────────────────────────────────────┤
│ 아이템 목록          ░░░░░░░░░░░░░  │
│  아이템 1   ┌─────────────────┐    │
│  아이템 2   │ 아이템 1     [×] │    │  ← @modal/(.)items/[id]
│  아이템 3   │ server / 1,000원 │    │
│             │ [풀페이지로 보기] │    │
│             └─────────────────┘    │
│ (배경: 목록 유지 + 딤 처리)          │
└────────────────────────────────────┘
```

`/items/1` — 새로고침 / URL 직접 진입: 과제 2의 풀페이지 상세 그대로.

## 미리 아는 함정

- `(.)` 매칭은 파일 경로가 아니라 **세그먼트** 기준. route group `(group)`은 세그먼트로 안 침
- 모달 뜬 상태로 GNB에서 다른 페이지 이동 → 모달이 남으면 `default.tsx` / catch-all로 처리
- `(.)` `(..)` `(...)` 차이는 docs에서 확인

## 완료 조건

- [ ] 목록 클릭 → 모달 + 배경 목록 유지
- [ ] 모달 상태에서 새로고침 → 풀페이지
- [ ] URL 직접 입력 진입 → 풀페이지
- [ ] 딤/[×] 클릭 → 목록으로 복귀 (히스토리 뒤로)
- [ ] 모달 뜬 채 About 이동 → 모달 사라짐

## 체크 질문

1. 목록에서 클릭했을 때 vs URL 직접 진입했을 때, 각각 어떤 파일들이 렌더되는가? ← 핵심 질문
2. `default.tsx`는 언제 렌더되는가? 없으면 왜 404인가?
3. 모달 닫기에 `router.back()`과 `router.push('/items')`의 차이는? 어느 쪽이 왜 맞는가?
4. 이 패턴 대신 zustand로 모달 open 상태를 들면 안 되나? 이 패턴의 장점 세 가지 (URL 공유 / 새로고침 대응 / 히스토리)
