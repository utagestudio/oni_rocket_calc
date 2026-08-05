# AGENTS

## Development Rules

- When changing rocket fuel calculation logic under `src/domain/rocketFuel.ts`, run `npm test`.
- If calculation behavior intentionally changes, update `tests/rocketFuel.test.ts` in the same change.
- Use the project-pinned Node.js version from `.mise.toml` when running npm scripts.
