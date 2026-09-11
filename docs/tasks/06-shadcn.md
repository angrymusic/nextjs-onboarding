# 과제 6. shadcn/ui + Tailwind

## 목표

shadcn 소유권 모델 이해: **라이브러리가 아니라 코드 복사기.** `src/components/ui/`는 우리가 소유한 코드고 수정해도 된다.

## 요구사항

### A. 컴포넌트 추가

```bash
pnpm dlx shadcn@latest add dialog input select label
```

- 추가된 파일들이 `src/components/ui/`에 **소스로 복사**되는 것 확인 (node_modules 아님)

### B. 생성 폼을 Dialog로 재구성

- 과제 4의 인라인 생성 폼 → [+ 새 아이템] 버튼 클릭 시 **Dialog** 안의 폼으로
- Input / Select / Label / Button 모두 shadcn 컴포넌트로 교체
- 생성 성공 시 Dialog 닫힘 + 목록 갱신 (기존 mutation 재사용)

### C. 커스터마이즈 1건

- `src/components/ui/button.tsx`를 직접 수정: variant `"brand"` 추가 (아무 색이나, 프로젝트 CSS 변수 사용) → [+ 새 아이템] 버튼에 적용

## 와이어프레임

```
┌──────────────────────────────────────────┐
│ 아이템 목록              [+ 새 아이템]      │  ← Button variant="brand"
│ ...목록...     ░░░░░░░░░░░░░░░░░░░░░░░░   │
│         ┌────────────────────────┐       │
│         │ 새 아이템 추가       [×] │       │  ← Dialog
│         │ 이름     [__________]   │       │  ← Input + Label
│         │ 카테고리  [server    ▾]  │       │  ← Select
│         │ 가격     [__________]   │       │
│         │           [취소] [추가]  │       │
│         └────────────────────────┘       │
└──────────────────────────────────────────┘
```

## 완료 조건

- [ ] Dialog 폼으로 생성 동작, 성공 시 닫힘 + invalidate
- [ ] variant "brand" 추가 diff가 `components/ui/button.tsx`에 있음
- [ ] 키보드로만 조작 가능 (Tab 이동, Esc 닫기 — Radix가 주는 것. 어디서 오는지 확인)

## 체크 질문

1. shadcn 컴포넌트에 버그가 있으면 이슈를 올려야 하나, 직접 고치나?
2. `pnpm dlx shadcn add button`을 다시 실행하면 내가 수정한 variant는 어떻게 되나?
3. Dialog의 포커스 트랩/Esc 닫기는 어느 레이어가 제공하나? (Radix)
4. `cn()`은 뭘 하나? 왜 `clsx`와 `tailwind-merge`가 둘 다 필요한가?
