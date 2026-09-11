# nextjs-onboarding

Next 15 App Router 학습용 repo. Vue/Spring 경력자의 Next.js 온보딩 과제를 이 위에서 진행한다.

## 시작

**이 repo를 직접 clone하지 말고 fork해서 시작한다.** 과제 PR은 본인 fork에 올린다.

```bash
# 1. GitHub에서 Fork 버튼 클릭
# 2. 본인 fork를 clone
git clone https://github.com/<본인계정>/nextjs-onboarding.git
cd nextjs-onboarding
pnpm install
pnpm dev
```

http://localhost:3000 접속. 패키지 매니저는 **pnpm** 사용 (npm/yarn 금지 — lockfile 충돌 방지).

## 과제

[docs/curriculum.md](docs/curriculum.md) — 선행 학습 + 과제 10개, 과제별 완료 조건 포함.

진행 방식:
- 과제마다 브랜치를 판다: `task/01-routing`, `task/02-boundary`, ...
- 완료하면 본인 fork에 PR을 올리고 리뷰어를 지정한다.

## 세팅된 것

| 항목 | 내용 |
|---|---|
| Next | 15 (App Router, Turbopack dev) |
| 언어/스타일 | TypeScript, Tailwind CSS v4 |
| UI | shadcn/ui (radix base) — `src/components/ui/`는 우리가 소유한 코드 |
| 서버 상태 | @tanstack/react-query — Provider는 `src/app/providers.tsx` |
| 테이블 | @tanstack/react-table (설치만 됨, 과제 7에서 사용) |
| 클라이언트 상태 | zustand (설치만 됨, 과제 5에서 사용) |
| Mock API | `/api/items` CRUD — 아래 참고 |

## Mock API

인메모리 저장소 (`src/lib/db.ts`). 서버 재시작 시 초기화. 모든 응답에 500ms 지연 — 로딩 UI 확인용.

```
GET    /api/items?page=1&pageSize=10&sort=price&desc=true   목록 (페이징·정렬)
POST   /api/items          { name, category, price }        생성
GET    /api/items/:id                                       단건
PATCH  /api/items/:id      { name?, category?, price? }     수정
DELETE /api/items/:id                                       삭제
```

`category`는 `"server" | "client" | "shared"`.
