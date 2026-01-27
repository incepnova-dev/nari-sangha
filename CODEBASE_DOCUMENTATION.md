# Nari Sangha Codebase Documentation

## Project Overview
- **Problem it solves:** Nari Sangha provides a women-focused digital platform with web and Android experiences backed by an API. It offers authentication, landing/onboarding flows, and the groundwork for community/content features.
- **Tech stack overview:**  
  - Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, Zod, Jest/Supertest.  
  - Web: React (CRA) + TypeScript, React Router, shared API client.  
  - Mobile: React Native (Android) + TypeScript, shared API client.  
  - Shared: Fetch-based API client, shared i18n package, placeholder shared types/UI/utils.  
  - Tooling: npm workspaces, Bash orchestration script.
- **Architecture (ASCII)**
```
               +-------------------------+
               |   Shared Packages      |
               |  (@narisangha/*)       |
               +-----------+------------+
                           |
        +------------------+-------------------+
        |                                      |
 +------+-------+                      +-------+------+
 |   Web (CRA)  |                      |  Mobile (RN) |
 | React, TS    |                      | React Native |
 +------+-------+                      +-------+------+
        \                                      /
         \            HTTP (fetch, JWT)       /
          \                                  /
           +---------- API (Express) --------+
                      |  Prisma
                      v
                PostgreSQL DB
```

## Monorepo Structure
- `apps/api`: Express + TypeScript backend with PostgreSQL/Prisma, JWT auth, validation, tests.
- `apps/web`: React (Create React App) TypeScript web frontend; landing and authenticated home; uses shared API client.
- `apps/mobile`: React Native Android app; manual route state machine; uses shared API client; Android native scaffold.
- `packages/*`:
  - `api-client`: Shared fetch-based HTTP client and auth/profile services.
  - `shared-i18`: Shared translations (en/hi/bn/kn).
  - `shared-types`, `ui-components`, `utils`: Placeholders/README.
- `services/*`: Skeleton for `ml-service` and `worker` (no code yet).
- `start-all.sh`: Dev orchestrator to start Postgres, API, web, Metro, emulator; generates `stop-all.sh`.

## Backend (apps/api)
- **Frameworks/Libraries:** Express, TypeScript, Prisma, PostgreSQL, JWT, bcrypt, Zod, helmet, cors, express-rate-limit, Jest, Supertest.
- **Folder structure (src):**
  - `config/` env loading (`env.ts`), Prisma client (`database.ts`).
  - `routes/` route registration (`index.ts`, `auth.routes.ts`).
  - `controllers/` business logic (`auth.controller.ts`).
  - `middleware/` auth (`auth.ts`), validation (`validation.ts`), error handling (`errorHandler.ts`).
  - `utils/` JWT helpers, password hashing.
  - `validators/` Zod schemas (auth).
  - `__tests__/` Jest + Supertest API tests.
- **Auth flow (JWT):**
  1) `/api/auth/login` validates body (Zod), finds user via Prisma, bcrypt compares password, signs JWT with `userId` using `JWT_SECRET` and `JWT_EXPIRES_IN`.  
  2) Token returned to client; client stores it.  
  3) Protected routes use `authenticate` middleware to verify `Authorization: Bearer <token>`, set `req.userId`, otherwise 401.  
  4) `/api/auth/profile` reads `req.userId`, returns user profile.
- **Database schema (Prisma):**
  - Model `User` (table `users`): `id (cuid, pk)`, `email (unique)`, `name?`, `password`, `createdAt`, `updatedAt`.
- **API endpoints (current):**
  - `GET /api/health` – health check.
  - `POST /api/auth/register` – register user; body `{email,password,name?}`.
  - `POST /api/auth/login` – login; body `{email,password}`.
  - `GET /api/auth/profile` – authenticated profile (Bearer token).
- **Middleware:**
  - Security: helmet, cors (origin from env), rate limiting (100/15m).
  - `authenticate` (JWT), `validate` (Zod), `errorHandler`.
- **Validation (Zod):** `registerSchema`, `loginSchema` enforce email format, password length, optional name.
- **Testing:** Jest + Supertest in `src/__tests__/auth.test.ts` covering register/login/profile happy paths and failure cases; Prisma cleanup per test.

## Frontend (apps/web)
- **Routing:** React Router; main routes in `component/routes/Routes.tsx` (`/`, `/home`, `/logout`). Landing flows in `component/landing/*`.
- **API integration:** Uses shared `packages/api-client` via `src/services/index.ts`; base URL from `src/config/api.config.ts` (`REACT_APP_API_URL` or defaults `http://localhost:3001/api`). `signIn` calls `/auth/login`; `getCurrentUser` uses `/auth/profile`.
- **State management:** Local React state (hooks) for user/session UI state; token persisted in `localStorage`/`sessionStorage` (`authToken`, `refreshToken`).
- **Auth handling:** `SignInModal` stores tokens on success; `useLandingAuth` closes modal and navigates to `/home`; `Home` checks token then calls `getCurrentUser`, redirects to landing if unauthorized.

## Mobile App (apps/mobile)
- **App structure:** Entry `src/App.tsx` keeps `currentUser`/language and passes to `components/routes/Routes.tsx`. Routes registry maps logical screens (welcome, signup flows, sign-in, home, profile, products, tracking, etc.) with `requiresAuth` flags.
- **API integration:** `src/services/index.ts` builds API client from `@narisangha/api-client` using `env.API_BASE_URL` (defaults to `http://10.0.2.2:3001/api` on Android emulator). Exposes `authService.signIn`, `profileService.getProfile`.
- **Navigation:** Custom in-memory router (not react-navigation) driven by route state; `navigation.navigate` updates current route; `requiresAuth` noted for gated screens (consumer responsible to enforce).
- **Build process:** Standard RN Android; Metro via `npm start`; install/run `npm run android`; prod build with `./gradlew assembleRelease` after configuring signing; emulator/device required.

## Environment Setup
- **Required software:**
  - Node.js 18+, npm.
  - PostgreSQL 14+.
  - JDK 17+, Android Studio + SDK/AVD (for mobile).
  - Optional: Bash for `start-all.sh`.
- **Setup steps:**
  1) Install deps per app: `cd apps/api && npm install`; `cd apps/web && npm install`; `cd apps/mobile && npm install`.
  2) API env: `cp apps/api/.env.example apps/api/.env`; set `DATABASE_URL`, `JWT_SECRET`, `PORT`, `CORS_ORIGIN`.
  3) Web env: create `apps/web/.env` with `REACT_APP_API_URL=http://localhost:3001/api`.
  4) Mobile env: adjust `apps/mobile/src/config/env.ts` if API host/port differ.
  5) DB: from `apps/api` run `npm run prisma:generate`, `npm run prisma:migrate`; optional `npm run db:seed`; `npm run db:setup` auto-creates db/user on Postgres.
  6) Run: API `npm run dev` (3001), Web `npm start` (3000), Mobile `npm start` + `npm run android`. Or use `./start-all.sh`.
- **ENV variables:**
  - API: `PORT`, `NODE_ENV`, `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN` (default 7d), `CORS_ORIGIN`.
  - Web: `REACT_APP_API_URL`.
  - Mobile: defined in `src/config/env.ts` (dev/prod host/port/base URL).

## Database
- **Tables:** `users` (model `User`).
- **Relationships:** None yet (single table).
- **Migrations:** Prisma migrate via `npm run prisma:migrate`; generated client via `npm run prisma:generate`; reset via `npx prisma migrate reset`; seed via `npm run db:seed`.

## Scripts & Automation
- **Root:** `npm run build:api-client`, `npm run watch:api-client`.
- **API (apps/api/package.json):** `dev`, `build`, `start`, `prisma:generate`, `prisma:migrate`, `prisma:studio`, `db:setup`, `db:seed`, `test`, `test:watch`, `test:coverage`.
- **Web (apps/web/package.json):** `start`, `build`, `test`, `eject`.
- **Mobile (apps/mobile/package.json):** `start` (Metro), `android`, `test`, `lint`; native gradle scripts under `android/`.
- **Orchestration:** `start-all.sh` starts Postgres, API, Web, Metro, emulator; supports background/logs or terminal modes; creates `stop-all.sh`.
- **Build/Deployment scripts:** API `npm run build && npm start`; Web `npm run build` (serve `build/`); Mobile `./gradlew assembleRelease`.

## How Everything Works Together
- **Login flow:**  
  Web/Mobile → shared API client → POST `/api/auth/login` → controller validates, checks user, bcrypt compare, JWT sign → client stores token → subsequent protected requests include `Authorization: Bearer <token>` → `authenticate` middleware verifies → controllers use `req.userId` → respond with data.
- **Data flow:**  
  Clients call API (`/api/*`) → Express routes → controllers → Prisma → Postgres. Responses returned as JSON to clients; shared api-client normalizes `ok/status/data|error`.
- **Error handling:**  
  Validation errors return 400 with Zod details; auth errors 401; duplicates 409; unhandled errors caught by `errorHandler` returning JSON with optional stack in dev; clients surface messages and redirect on auth failure.

## Common Issues & Debugging
- API unreachable: check `PORT`/`CORS_ORIGIN`; confirm server running and `REACT_APP_API_URL`/mobile `env.ts` correct; emulator must use `10.0.2.2`.
- JWT 401: ensure `Authorization: Bearer <token>` present; verify matching `JWT_SECRET`; token storage in client.
- DB errors: verify `DATABASE_URL`; run migrations; ensure Postgres running; use `prisma studio` to inspect.
- Metro bundler cache: `npm start -- --reset-cache`.
- Android build: `cd android && ./gradlew clean`; ensure SDK/AVD present.
- Web auth redirect loop: confirm tokens persisted and `getCurrentUser` hits correct API base URL; check CORS.
- start-all script failures on Windows: script is Bash-oriented; run via WSL/Git Bash or start services manually.

## Future Improvements
- Expand schema (profiles, content, community entities) and related endpoints.
- Add refresh token flow and token rotation; secure storage on mobile.
- Introduce role-based auth/permissions.
- Add react-navigation for mobile and enforce `requiresAuth` guards.
- Fill shared packages (`ui-components`, `utils`, `shared-types`) with real code and publish or link via workspace.
- Implement ML/worker services and define integration (HTTP/queue).
- Add CI/CD (lint/test/build) and containerization for API/Postgres.
- Add rate-limit/config for production, structured logging, and observability.
