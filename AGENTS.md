# AGENTS

## Project Context

- This is a Next.js web tool for calculating rocket fuel requirements for Oxygen Not Included.
- The current refactoring work is driven by `TODO.md`, which is intentionally ignored by Git.
- The next planned calculation task is to review and fix suspected double-counting of non-Steam oxidizer tank mass in `src/domain/rocketFuel.ts`.

## Runtime

- Use the project-pinned Node.js version from `.mise.toml` when running npm scripts.
- Node.js 25 can trigger `localStorage.getItem is not a function` with Next.js 15 because Web Storage is exposed differently on the server. Keep this project on Node.js 24 unless the runtime issue is deliberately revisited.

## Calculation Code

- Rocket fuel calculation logic lives in `src/domain/rocketFuel.ts`.
- `src/hooks/useAmount.tsx` is currently a thin React wrapper around the domain calculation. Avoid moving calculation details back into React hooks or UI components.
- `tests/rocketFuel.test.ts` currently captures the existing behavior, including behavior that may be wrong. When fixing calculation bugs, update the expected values in the same commit and explain the intended behavior change.
- When changing rocket fuel calculation logic under `src/domain/rocketFuel.ts`, run `npm test`.
- If calculation behavior intentionally changes, update `tests/rocketFuel.test.ts` in the same change.

## Git

- Follow `SKILLS/git-commit.md` for commit message format when committing.
- `SKILLS/git-commit.md` is a local instruction file and is ignored by Git; do not add it to commits.
