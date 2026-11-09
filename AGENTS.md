# AGENTS.md

## Project

Tutorial Express API. Node.js + TypeScript + Express 5, with Postgres 17 and pgAdmin in Docker.

This is a learning project. Prefer clear, commented code over clever abstractions. Match the
existing style before you introduce a new pattern.

## Commands

| Task | Command |
|-|-|
| Install dependencies | `npm install` |
| Run the dev server | `npm run dev` |
| Typecheck | `npx tsc --noEmit` |
| Start Postgres and pgAdmin | `docker compose --project-name tut-express up -d` |
| Stop the containers | `docker compose --project-name tut-express down` |
| Apply migrations | `npm run migrate:up` |
| Revert the last migration | `npm run migrate:down` |

- `npm run dev` loads `.env`, watches files, and runs `src/index.ts`.
- `tsx` does not typecheck. Run `npx tsc --noEmit` after code changes.
- There is no test, lint, format, or build script. `npm test` exits 1 by design.
  Do not claim a check passed if no script runs it.

## First run

1. `cp .env.example .env`
2. `docker compose up -d`
3. `npm install`
4. `npm run dev`

pgAdmin runs at http://localhost:3102 with `admin@admin.com` / `admin` (from `.env.example`).
Register the server with host `postgres`, port `5432`, user `postgres`, password `postgres`.

## Layout

| Path | Purpose |
|-|-|
| `src/index.ts` | Entry point. Creates the Express app and listens on `APP_PORT` (default 3000). |
| `src/routes/` | Route definitions |
| `src/controllers/` | Request handlers |
| `src/services/` | Business logic |
| `src/repositories/` | Data access and SQL |
| `src/models/` | DB models and domain types |
| `src/middleware/` | Express middleware |
| `src/validator/` | Input validation |
| `src/config/` | Environment and config loading |
| `src/jobs/` | Background jobs |
| `src/utils/` | Shared helpers |
| `src/types/` | Shared TypeScript types |
| `migrations/` | Database migrations |
| `autostart/` | tmux and systemd dev-start scripts |

Most folders hold only `placeholder.txt`. Put new code in the matching layer. Do not grow
`src/index.ts` into the app. Keep it to setup and `app.listen`.

## Conventions

- TypeScript strict mode. Give exported functions and handlers explicit return types.
- CommonJS output (`"type": "commonjs"`), target ES6. Use `import` / `export` syntax.
- 4-space indent, single quotes, semicolons. Match `src/index.ts`.
- Name unused Express params `_req` / `_res`.
- Keep the flow `route -> controller -> service -> repository`. SQL belongs in
  `src/repositories/`, not in a controller.
- Read settings from `process.env`. Add every new variable to `.env.example`, not only `.env`.
  `.env` is gitignored.
- Express 5 forwards async errors. Do not wrap a handler in `try/catch` only to call `next(err)`.

## Database

- Postgres runs in Docker. The host port is `DB_PORT` (default 3101). The container port is 5432.
- The default database, user, and password are all `postgres`.
- `node-pg-migrate` is installed, but `migrations/0001_create_friends_table.sql` is a plain SQL
  file. `node-pg-migrate` expects `.js` or `.ts` migrations. Confirm the format before you add a
  migration, or apply the SQL with `psql`.
- The migrate scripts pass no connection string, and `.env` has no `DATABASE_URL`. Set
  `DATABASE_URL` before you rely on `npm run migrate:*`.
- Do not drop the `postgres_data` volume unless the user asks. It holds local data.

## Gotchas

- `src/index.ts` stores users in an in-memory `fake_db` array. Data is lost on restart. Move
  this to the repository layer instead of extending the array.
- Never print or commit secrets from `.env`.

## Do not

- Commit `.env`, `node_modules/`, `dist/`, or `*.log`.
- Run `autostart/deploy-service.sh` or change systemd units unless the user asks.
- Rewrite the tutorial sections of `README.md` without asking.

## Done means

1. `npx tsc --noEmit` passes.
2. The dev server starts with `npm run dev`.
3. You state what you changed, and what you could not verify.
