# 과제 9. Middleware — 요청 파이프라인

## 목표

가짜 로그인으로 인증 가드 구현. middleware가 요청 파이프라인 어디에 서는지 이해.

**Spring 매핑**: Filter/Interceptor와 같은 자리. 차이 세 가지 —

- Edge 런타임: Node API 대부분 사용 불가
- 앱당 1개, 체이닝 없음
- 매칭되는 **모든** 요청에 실행 → 무거운 로직(DB 조회 등) 금지

## 선행 docs (숙지 후 진행)

- [middleware.js](https://nextjs.org/docs/app/api-reference/file-conventions/middleware) ← matcher 섹션까지 정독
- [cookies()](https://nextjs.org/docs/app/api-reference/functions/cookies)

## 요구사항

### A. 가짜 로그인

- `/login` 페이지: 아이디 input + [로그인] 버튼 (비밀번호 없음 — 인증이 목적이 아니라 쿠키가 목적)
- 로그인 서버 액션(과제 8 복습): 쿠키 `session=<아이디>` 설정 (`cookies()` 사용, httpOnly) 후 `/items`로 redirect
- GNB에 로그인 상태 표시: 서버 컴포넌트에서 `cookies()` 읽어 "OO님 / [로그아웃]" 또는 "[로그인]"
- 로그아웃: 쿠키 삭제 액션

### B. middleware

- `src/middleware.ts`:
  - `session` 쿠키 없이 `/items` 이하 접근 → `/login?from=<원래경로>`로 redirect
  - 로그인 후 `from`으로 복귀
  - `config.matcher = ['/items/:path*']` — 이것만 보호. `/about`, `/feedback`, 정적 자산은 안 탐

## 화면 흐름

```
비로그인으로 /items/3 진입
   → middleware가 가로챔
   → /login?from=/items/3
   → 아이디 입력 [로그인]
   → 쿠키 설정 + /items/3 으로 redirect

┌────────────────────────────────────┐
│ GNB  [Items][About][Feedback]  창훈님 [로그아웃] │
└────────────────────────────────────┘
```

## 완료 조건

- [ ] 비로그인 `/items` 접근 → `/login` redirect, 로그인 후 원래 경로 복귀
- [ ] `/about`은 비로그인도 접근 가능
- [ ] matcher가 `_next/static` 등 정적 자산을 안 태움 (matcher를 `/:path*`로 바꿔 console.log 찍어보고 차이 확인 → 되돌리기)
- [ ] middleware 안에 db 접근 없음 — 쿠키 존재 여부만 확인

## 체크 질문

1. middleware는 언제 실행되나? 서버 컴포넌트 렌더보다 앞인가 뒤인가?
2. Spring Interceptor와 같은 점 / 다른 점?
3. middleware에서 세션을 DB로 검증하면 왜 안 되나? 그럼 진짜 검증은 어디서?
4. matcher 없이 두면 어떤 요청까지 middleware를 타는가?
5. `redirect()`와 `NextResponse.redirect()`의 차이는?
