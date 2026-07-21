---
name: pr-writer
description: Analyze the current branch changes and write a PR title/body that follows .github/pull_request_template.md. Use when creating or updating a pull request description.
---

# PR Writer

이 스킬은 현재 브랜치의 변경사항을 분석해서 `.github/pull_request_template.md` 형식에 맞는 PR title과 PR body를 작성한다.

반드시 프로젝트의 실제 PR 템플릿을 먼저 읽고, 템플릿 구조를 유지한 채 내용을 채운다.

## Step 0. Pre-flight Checks

PR description을 작성하기 전에 아래 검증을 실행한다.

```bash
pnpm typecheck
pnpm lint --max-warnings 0
pnpm format:check
pnpm build
```

규칙:

- 새로 변경한 파일 때문에 실패하면 수정 후 다시 실행한다.
- 현재 브랜치와 무관한 기존 이슈로 실패하면 PR body의 `기타 사항 or 추가 코멘트`에 명시한다.
- `pnpm typecheck` 또는 `pnpm build`가 missing-module 오류로 실패하면 `pnpm install` 후 재시도한다.
- `pnpm format:check`가 변경 파일에서 실패하면 변경 파일만 포맷한 뒤 재실행한다.
- 검증 결과는 PR body에 길게 나열하지 않는다. 실패/예외가 있을 때만 `기타 사항 or 추가 코멘트`에 짧게 적는다.

## Step 1. Read PR Template

항상 실제 템플릿을 읽는다.

```bash
cat .github/pull_request_template.md
```

현재 템플릿의 주요 섹션:

```markdown
## ✅ PR 유형

### 📌 관련 이슈번호

### ✅ Key Changes

### 📸 스크린샷 or 실행영상

## 🎸 기타 사항 or 추가 코멘트
```

템플릿의 제목, 구분선, 체크박스 문구는 임의로 바꾸지 않는다.

## Step 2. Analyze Changes

기준 브랜치를 찾아 현재 브랜치 변경사항을 분석한다.

```bash
BASE_BRANCH=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
git diff "origin/${BASE_BRANCH}"...HEAD --stat
git log "origin/${BASE_BRANCH}"...HEAD --oneline
git diff "origin/${BASE_BRANCH}"...HEAD
```

`origin/HEAD`를 알 수 없으면 `origin/develop`, `origin/main`, `HEAD~1` 순서로 합리적인 기준을 선택한다.

분석할 때 확인할 것:

- 변경된 파일 목록과 변경 범위
- 신규 기능인지, 버그 수정인지, 리팩토링/문서/설정 변경인지
- 사용자에게 의미 있는 주요 변경사항
- package/dependency/build 설정 변경 여부
- 문서만 변경한 PR인지 여부

## Step 3. Extract Issue Number

브랜치명에서 이슈 번호를 추출한다.

```bash
git branch --show-current
```

지원하는 예:

- `feat/#22-onboarding` → `#22`
- `style/#22-컬러토큰-수정` → `#22`
- `fix/KBT-22-route` → `#22`
- `feat/22-button` → `#22`

번호를 찾을 수 없으면 `Closed #`는 비워둔다.

## Step 4. Determine PR Type

`.github/pull_request_template.md`의 체크박스 중 해당하는 항목만 `[x]`로 표시한다. 여러 유형이 섞이면 주요 변경 1개를 우선 체크하고, 패키지/문서 변경이 의미 있게 포함된 경우 추가 체크한다.

| Change                                             | PR Type                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| New files, new user-facing behavior                | 새로운 기능 추가                                                         |
| Bug fix                                            | 버그 수정                                                                |
| Refactor, restructure                              | 코드 리팩토링                                                            |
| Typo, variable rename, formatting only             | 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경) |
| Comment add/edit                                   | 주석 추가 및 수정                                                        |
| README, CLAUDE.md, .claude/rules, docs             | 문서 수정                                                                |
| package.json, pnpm-lock.yaml, Vite/CI/build config | 빌드 부분 혹은 패키지 매니저 수정                                        |
| File/folder rename                                 | 파일 혹은 폴더명 수정                                                    |
| File/folder delete                                 | 파일 혹은 폴더 삭제                                                      |

## Step 5. Generate PR Title

PR title 형식:

```text
[Type] #{number}: 작업 내용 요약
```

이슈 번호가 없으면:

```text
[Type] 작업 내용 요약
```

Prefix mapping:

| PR Type                           | Prefix       |
| --------------------------------- | ------------ |
| 새로운 기능 추가                  | `[Feat]`     |
| 버그 수정                         | `[Fix]`      |
| 코드 리팩토링                     | `[Refactor]` |
| 코드에 영향을 주지 않는 변경사항  | `[Style]`    |
| 주석 추가 및 수정                 | `[Chore]`    |
| 문서 수정                         | `[Docs]`     |
| 빌드 부분 혹은 패키지 매니저 수정 | `[Chore]`    |
| 파일 혹은 폴더명 수정             | `[Chore]`    |
| 파일 혹은 폴더 삭제               | `[Chore]`    |

예:

```text
[Style] #22: 컬러 토큰 및 공통 컴포넌트 색상명 정리
```

## Step 6. Generate PR Body

`.github/pull_request_template.md` 내용을 그대로 기반으로 채운다.

작성 규칙:

- `PR 유형`: 해당 체크박스만 `[x]`, 나머지는 `[ ]`.
- `관련 이슈번호`: 이슈 번호가 있으면 `- Closed #22`, 없으면 `- Closed #`.
- `Key Changes`: 변경사항을 2~5개 bullet로 요약한다.
- `스크린샷 or 실행영상`: 템플릿 placeholder를 남긴다. UI 변경이 있으면 “첨부 예정” 정도로 둔다.
- `기타 사항 or 추가 코멘트`: 검증 결과 특이사항, 미실행 사유, 기존 이슈를 적는다. 없으면 `- 없음`.

예시 형식:

```markdown
## ✅ PR 유형

어떤 변경 사항이 있었나요?

- [x] 새로운 기능 추가
- [ ] 버그 수정
- [ ] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
- [ ] 코드 리팩토링
- [ ] 주석 추가 및 수정
- [ ] 문서 수정
- [ ] 빌드 부분 혹은 패키지 매니저 수정
- [ ] 파일 혹은 폴더명 수정
- [ ] 파일 혹은 폴더 삭제

---

### 📌 관련 이슈번호

- Closed #22

---

### ✅ Key Changes

- 변경사항 1
- 변경사항 2
- 변경사항 3

### 📸 스크린샷 or 실행영상

<!-- 이해하기 쉽도록 스크린샷을 첨부해주세요. -->

---

## 🎸 기타 사항 or 추가 코멘트

- 없음
```

## Step 7. PR Update

기존 PR description 업데이트 요청이면 마지막 push 이후 변경만 분석한다.

```bash
LAST_PUSH=$(git rev-parse @{push} 2>/dev/null || git rev-parse origin/$(git branch --show-current) 2>/dev/null || echo "HEAD")
git diff "${LAST_PUSH}" --stat
git log "${LAST_PUSH}"..HEAD --oneline
git diff "${LAST_PUSH}"
```

기존 `Key Changes` 아래에 구분자를 두고 추가한다.

```markdown
#### 🔄 추가 변경사항 (2차)

- change 1
- change 2
```

규칙:

- 몇 번째 업데이트인지 명시한다. 예: `2차`, `3차`.
- 변경 성격이 달라졌으면 PR 유형 체크박스도 업데이트한다.
- 기존 사용자가 작성한 문구는 보존하고 필요한 부분만 덧붙인다.
