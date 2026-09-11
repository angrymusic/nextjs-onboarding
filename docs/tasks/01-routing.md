# 과제 1. 라우팅 + 레이아웃

## 목표

파일 기반 라우팅 구조 이해. 페이지 3개와 공통 레이아웃으로 앱 뼈대를 만든다.
데이터는 아직 하드코딩 — 이 과제는 오직 라우팅.

**Vue 매핑**: 파일 구조 = Vue Router 설정 객체. `layout.tsx` = `<router-view>`를 감싸는 부모 컴포넌트.

## 선행 docs (숙지 후 진행)

과제 시작 전에 아래 공식 문서를 먼저 읽는다. 외우지 말고 개념만 — 과제 중 다시 찾아보면 된다.

- [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
- [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
- [not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) + [notFound()](https://nextjs.org/docs/app/api-reference/functions/not-found)

## 요구사항

생성할 라우트 3개:

| URL | 파일 | 내용 |
|---|---|---|
| `/items` | `src/app/items/page.tsx` | 아이템 목록 (아래 하드코딩 3건) |
| `/items/[id]` | `src/app/items/[id]/page.tsx` | 아이템 상세. `params.id` 표시 (Next 15: `params`는 **Promise**) |
| `/about` | `src/app/about/page.tsx` | 이 학습 repo 소개 한 단락 |

추가 파일:

- `src/app/layout.tsx` 수정: 모든 페이지 상단에 GNB (Items / About 링크, `next/link` 사용)
- `src/app/items/loading.tsx`: "불러오는 중..." (효과는 과제 2에서 체감)
- `src/app/items/[id]/not-found.tsx` + 상세 페이지에서 id가 1~20 범위 밖이면 `notFound()` 호출

하드코딩 데이터 (목록/상세 공용, 아무 데나 상수로):

```ts
const ITEMS = [
  { id: 1, name: "아이템 1", category: "server", price: 1000 },
  { id: 2, name: "아이템 2", category: "client", price: 2000 },
  { id: 3, name: "아이템 3", category: "shared", price: 3000 },
];
```

## 와이어프레임

`/items`:

```
┌────────────────────────────────────┐
│ GNB   [Items]  [About]             │
├────────────────────────────────────┤
│ 아이템 목록                         │
│                                    │
│  아이템 1    server    1,000원   → │   ← 클릭 시 /items/1
│  아이템 2    client    2,000원   → │
│  아이템 3    shared    3,000원   → │
└────────────────────────────────────┘
```

`/items/1`:

```
┌────────────────────────────────────┐
│ GNB   [Items]  [About]             │
├────────────────────────────────────┤
│ ← 목록으로                          │
│                                    │
│ 아이템 1                            │
│ 카테고리: server                    │
│ 가격: 1,000원                       │
└────────────────────────────────────┘
```

## 완료 조건

- [ ] `/items`, `/items/2`, `/about` 모두 URL 직접 입력 + 새로고침으로 정상 진입
- [ ] GNB가 모든 페이지에 나타나고, 페이지 이동 시 전체 새로고침 없음 (Network 탭으로 확인)
- [ ] `/items/999` 진입 시 not-found 화면
- [ ] `<a>` 태그 대신 `next/link` 사용

## 체크 질문 (리뷰 때 물어봄)

1. `layout.tsx`와 `page.tsx`의 차이는? 페이지 이동 시 layout은 리렌더되는가?
2. `[id]` 값은 컴포넌트에서 어떻게 받았는가? Next 15에서 `params`가 Promise인 이유는?
3. Vue Router의 `beforeEnter` 같은 라우트 가드는 Next에서 어디서 처리할까? (답 몰라도 됨 — 과제 9 예고)
4. `loading.tsx`는 어떤 메커니즘으로 동작하는가? (Suspense 경계)
