# Next.js 온보딩 커리큘럼 (Vue/Spring 경력자용)

대상: Vue + Spring 스택 경력 개발자
목표: Next 15 App Router 프로젝트 인수인계 전 기반 학습
기간: 과제당 반나절~1일 (과제 3만 1~2일), 총 8~10일

과제 1~9는 이 repo 위에서 **하나의 미니앱("아이템 콘솔")을 점진적으로 완성**하는 구조다.
순서대로 진행하고, 각 과제는 이전 과제 결과 위에 쌓인다.

## 선행 학습 (1~2일, 이것만)

- Next 공식 docs: **Server and Client Components**
- Next 공식 docs: **Layouts and Pages**
- TanStack Query 공식: **Quick Start**

## 과제 목록

| # | 과제 | 난이도 | 기간 |
|---|---|---|---|
| 1 | [라우팅 + 레이아웃](tasks/01-routing.md) | ● | 0.5~1일 |
| 2 | [서버/클라이언트 경계](tasks/02-boundary.md) ★최중요 | ●● | 1일 |
| 3 | [모달 = Parallel + Intercepting Route](tasks/03-modal-routes.md) ★고난도 | ●●● | 1~2일 |
| 4 | [TanStack Query CRUD](tasks/04-tanstack-query.md) | ●● | 1일 |
| 5 | [Zustand](tasks/05-zustand.md) | ● | 0.5일 |
| 6 | [shadcn/ui + Tailwind](tasks/06-shadcn.md) | ● | 0.5~1일 |
| 7 | [TanStack Table 서버 페이징](tasks/07-tanstack-table.md) | ●● | 1일 |
| 8 | [서버 액션](tasks/08-server-action.md) | ● | 0.5일 |
| 9 | [Middleware](tasks/09-middleware.md) | ●● | 0.5~1일 |
| 10 | [종합 — 실제 프로젝트 미니 기능](tasks/10-capstone.md) | ●●● | 1~2일 |

각 과제 파일 구성: 목표 / **선행 docs (숙지 후 진행)** / 요구사항(라우트·파일 명세) / 와이어프레임 / 완료 조건 체크리스트 / 체크 질문.
**체크 질문은 리뷰 때 멘토가 그대로 물어본다** — 미리 보고 준비해도 됨 (오히려 권장).

## 진행 방식

1. 이 repo를 fork
2. 과제마다 브랜치: `task/01-routing`, `task/02-boundary`, ...
3. 완료 조건 체크리스트를 PR 설명에 복사해 체크
4. 본인 fork에 PR → 멘토를 리뷰어 지정 → 리뷰 후 fork의 main에 머지 → 다음 과제

## 운영 팁 (멘토용)

- 체크 질문은 시험이 아니라 대화용. 답 못 하면 그 자리에서 코드 열고 같이 확인
- 과제 2(경계)와 3(모달)에서 막히는 게 정상. 여기서 시간 아끼려 하지 말 것
- 과제 10의 질문 3, 4 답변은 인수인계 문서에 반영
