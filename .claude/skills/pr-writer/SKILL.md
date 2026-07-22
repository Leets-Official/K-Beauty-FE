---
name: pr-writer
description: Analyze the current branch changes and write a PR title/body that follows .github/pull_request_template.md. Use when creating or updating a pull request description.
---

# PR Writer

This skill analyzes the current branch changes and generates a PR title and PR body that follow `.github/pull_request_template.md`.

Always read the project's actual PR template first, then preserve the template structure while filling in the content.

## Step 0. Pre-flight Checks

Before writing the PR description, run these checks:

```bash
pnpm typecheck
pnpm lint --max-warnings 0
pnpm format:check
pnpm build
```

Rules:

- If a check fails because of newly changed files, fix the issue and re-run the check.
- If a check fails because of a pre-existing issue unrelated to the current branch, mention it in the PR body's `기타 사항 or 추가 코멘트` section.
- If `pnpm typecheck` or `pnpm build` fails with missing-module errors, run `pnpm install` and retry.
- If `pnpm format:check` fails on changed files, format only those files and re-run the check.
- Do not list verification results verbosely in the PR body. Only mention failures, skipped checks, or exceptions briefly in `기타 사항 or 추가 코멘트`.

## Step 1. Read PR Template

Always read the actual template:

```bash
cat .github/pull_request_template.md
```

Main sections in the current template:

```markdown
## ✅ PR 유형

### 📌 관련 이슈번호

### ✅ Key Changes

### 📸 스크린샷 or 실행영상

## 🎸 기타 사항 or 추가 코멘트
```

Do not rename template headings, separators, or checkbox labels.

## Step 2. Analyze Changes

Find the base branch and analyze the current branch changes.

```bash
BASE_BRANCH=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
git diff "origin/${BASE_BRANCH}"...HEAD --stat
git log "origin/${BASE_BRANCH}"...HEAD --oneline
git diff "origin/${BASE_BRANCH}"...HEAD
```

If `origin/HEAD` cannot be determined, choose a reasonable base in this order: `origin/develop`, `origin/main`, then `HEAD~1`.

Check for:

- Changed files and scope
- Whether the change is a feature, bug fix, refactor, documentation change, or configuration change
- Key user-facing or developer-facing changes
- Package/dependency/build configuration changes
- Whether the PR is documentation-only

## Step 3. Extract Issue Number

Extract the issue number from the branch name.

```bash
git branch --show-current
```

Supported examples:

- `feat/#22-onboarding` → `#22`
- `style/#22-color-token-update` → `#22`
- `fix/KBT-22-route` → `#22`
- `feat/22-button` → `#22`

If no issue number is found, leave `Closed #` empty.

## Step 4. Determine PR Type

Mark only the matching checkbox from `.github/pull_request_template.md` with `[x]`. If multiple categories apply, prioritize the main change. Also check package/documentation categories when those changes are meaningful.

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

PR title format:

```text
[Type] #{number}: summary of the work
```

If there is no issue number:

```text
[Type] summary of the work
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

Example:

```text
[Style] #22: update color tokens and shared component color names
```

## Step 6. Generate PR Body

Fill the PR body based on `.github/pull_request_template.md`.

Writing rules:

- `PR 유형`: mark only matching checkboxes with `[x]`; leave the rest as `[ ]`.
- `관련 이슈번호`: use `- Closed #22` when an issue number exists; otherwise use `- Closed #`.
- `Key Changes`: summarize changes in 2-5 bullets.
- `스크린샷 or 실행영상`: keep the template placeholder. For UI changes, leave a short placeholder such as "to be attached".
- `기타 사항 or 추가 코멘트`: mention verification exceptions, skipped checks, or pre-existing issues. If there are none, write `- 없음`.

Example format:

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

When updating an existing PR description after additional commits, analyze only changes since the last push.

```bash
LAST_PUSH=$(git rev-parse @{push} 2>/dev/null || git rev-parse origin/$(git branch --show-current) 2>/dev/null || echo "HEAD")
git diff "${LAST_PUSH}" --stat
git log "${LAST_PUSH}"..HEAD --oneline
git diff "${LAST_PUSH}"
```

Append under the existing `Key Changes` with a separator.

```markdown
#### 🔄 추가 변경사항 (2차)

- change 1
- change 2
```

Rules:

- Indicate the update iteration, such as `2차` or `3차`.
- Update PR type checkboxes if the nature of the change has changed.
- Preserve user-written text in the existing PR body and append only what is necessary.
