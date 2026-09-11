# 과제 2. 서버/클라이언트 컴포넌트 경계 ★ 최중요

## 목표

"어디까지 서버, 어디부터 `'use client'`" 감각 형성. 과제 1의 하드코딩을 실데이터로 교체하면서 경계를 긋는다.

**Vue 매핑**: Vue에는 이 구분이 없다. "이 컴포넌트 코드가 브라우저 번들에 들어가는가?"가 기준이라는 걸 몸으로 익히는 과제.

## 선행 docs (숙지 후 진행)

- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) ← 전부. 정독
- [use client 지시어](https://nextjs.org/docs/app/api-reference/directives/use-client)

## 요구사항

### A. 서버 컴포넌트에서 데이터 렌더

- `/items` 페이지: 하드코딩 제거, 서버 컴포넌트에서 `db.list()` **직접 호출** (`@/lib/db` import, fetch 불필요 — 서버에서 도니까)
- `/items/[id]` 페이지: `db.get(id)` 직접 호출, 없으면 `notFound()`
- `db.list()` 앞에 `await delay(1000)` 넣고 과제 1의 `loading.tsx`가 뜨는 것 확인 (확인 후 delay 제거)

### B. 클라이언트 컴포넌트 분리 2건

1. `src/components/copy-id-button.tsx` — 상세 페이지에 "ID 복사" 버튼. `navigator.clipboard` 사용, 복사 후 버튼 옆에 2초간 "복사됨!" 표시 (`useState`)
2. `src/components/detail-tabs.tsx` — 상세 페이지를 탭 2개(정보 / 메모)로. 탭 전환 상태는 client, **탭 내용물은 서버에서 렌더한 것을 `children`(또는 props)으로 전달** ← children 패턴 실습이 핵심

### C. 의도적 실수 체험 (코드는 남기지 말고 에러 메시지를 PR 설명에 캡처)

1. 서버 컴포넌트(page.tsx)에 `useState` 넣고 에러 전문 읽기
2. 클라이언트 컴포넌트에서 `@/lib/db` import 해보고 무슨 일이 나는지 확인

## 와이어프레임

`/items/1` (과제 2 완료 후):

```
┌────────────────────────────────────┐
│ GNB   [Items]  [About]             │
├────────────────────────────────────┤
│ ← 목록으로                          │
│ 아이템 1            [ID 복사]       │  ← client
│                                    │
│ ┌─[정보]──[메모]─────────────┐      │  ← 탭 전환: client
│ │ 카테고리: server            │     │  ← 내용: 서버 렌더 children
│ │ 가격: 1,000원               │     │
│ │ 등록일: 2026-09-10          │     │
│ └────────────────────────────┘     │
└────────────────────────────────────┘
```

메모는 지금은 아래 참고

```
<p>메모가 없습니다.</p>
```

## 완료 조건

- [ ] `page.tsx` 두 개 모두 `'use client'` 없음 (서버 컴포넌트 유지)
- [ ] `'use client'` 파일은 정확히 2개 (copy-id-button, detail-tabs)
- [ ] detail-tabs의 탭 내용이 children으로 전달됨 (탭 컴포넌트 안에서 db 접근 금지)
- [ ] 각 컴포넌트 파일 최상단에 "왜 server/client인지" 설명할수가 있다.
- [ ] PR 설명에 C의 에러 메시지 2건 + 각각 왜 나는지 한 줄 해석

## 체크 질문

1. `'use client'`를 붙이면 그 파일만 클라이언트가 되는가? (import 트리 전파)
2. 서버 컴포넌트 코드는 브라우저 번들에 포함되는가? db 접속 정보가 안전한 이유는?
3. 클라이언트 컴포넌트 안에 서버 컴포넌트를 넣고 싶으면 어떻게 하는가? — B-2에서 직접 했음. 설명해보기
4. 이 구분으로 얻는 것 세 가지는? (번들 크기 / 데이터 직접 접근 / 시크릿 보호)
5. 서버 컴포넌트에 `onClick`을 달면 무슨 일이 일어나는가?
