## Nari Sangha Monorepo

The `nari-sangha` monorepo contains all applications and services for the Nari Sangha platform.

### Structure

- **apps/**
  - **api/** – Express.js + TypeScript backend (PostgreSQL, Prisma, JWT)
  - **web/** – React web app (Create React App + TypeScript)
  - **mobile/** – React Native Android app
- **packages/**
  - **shared-types/** – Shared TypeScript types (placeholder)
  - **ui-components/** – Shared UI components (placeholder)
  - **utils/** – Shared utilities (placeholder)
- **services/**
  - **ml-service/** – Python ML service (skeleton)
  - **worker/** – Background worker service (skeleton)

---

## Prerequisites

- **Node.js**: v18 or higher (recommended for all JS projects)
- **npm**: comes with Node.js
- **PostgreSQL**: v14+ (for `apps/api`)
- **Java JDK 17+**, **Android Studio + SDK** (for `apps/mobile`)
- **Python 3.10+** (for future ML / worker services)

Each app has its own `package.json` (or language-specific config). All commands below are run **from the app’s directory** unless noted.

---

## Backend API (`apps/api`)

Backend API built with **Express.js**, **TypeScript**, **PostgreSQL**, **Prisma**, **Zod**, **JWT**, **Jest**, and **Supertest**.

### Setup

```bash
cd apps/api
npm install
```

### Environment

```bash
cd apps/api
cp .env.example .env
```

Edit `.env` and set at least:

- `DATABASE_URL` – PostgreSQL URL, e.g.  
  `postgresql://user:password@localhost:5432/nari_sangha?schema=public`
- `JWT_SECRET` – secure random string (32+ chars)
- `PORT` – API port (default: `3001`)
- `CORS_ORIGIN` – allowed frontend origin, e.g. `http://localhost:3000`

Helpful scripts:

```bash
# Generate JWT secret helper (prints a secure secret)
./scripts/generate-jwt-secret.sh

# Automatic DB setup (user + database + privileges)
npm run db:setup

# Prisma client + migrations
npm run prisma:generate
npm run prisma:migrate
```

### Run API

```bash
cd apps/api

# Development
npm run dev

# Production
npm run build
npm start
```

The API will listen on `http://localhost:<PORT>` (default `3001`).

### Key Endpoints

- **Health**
  - `GET /api/health` – API status

- **Auth**
  - `POST /api/auth/register`  
    Body: `{ "email": string, "password": string, "name"?: string }`
  - `POST /api/auth/login`  
    Body: `{ "email": string, "password": string }`
  - `GET /api/auth/profile`  
    Header: `Authorization: Bearer <JWT>`

### Tests

```bash
cd apps/api
npm test           # run tests
npm run test:watch
npm run test:coverage
```

---

## Web App (`apps/web`)

React web app built with **Create React App** + **TypeScript** and **React Router**.

### Setup

```bash
cd apps/web
npm install
```

### Run Web App

```bash
cd apps/web

# Development
npm start

# Production build
npm run build
```

- Dev server: `http://localhost:3000`
- Main routes (from `App.tsx`):
  - `/narisangha` – Nari Sangha main experience

If the API is running on `http://localhost:3001`, configure any API clients in `src/config/api.config.js` to point to that base URL.

---

## Mobile App (`apps/mobile`)

React Native Android app (Metro bundler + Android native project).

### Setup

```bash
cd apps/mobile
npm install
```

Ensure:

- JDK 17+ installed
- Android Studio with:
  - Android SDK Platform 34
  - Build-Tools 34.0.0
- At least one Android Virtual Device (AVD) **or** a physical device with USB debugging enabled.

### Run Mobile App (Android)

Typical workflow:

```bash
cd apps/mobile

# 1. Start Metro bundler
npm start            # or: npm start -- --reset-cache

# 2. Start emulator (from Android Studio or CLI)
emulator -avd <Your_AVD_Name>

# 3. Build & install on Android
npm run android
```

Metro bundler must stay running while the app is in use.

### Useful Commands

From `apps/mobile`:

- `npm start` – Start Metro bundler
- `npm run android` – Build & run on Android
- `npm test` – Run tests (if configured)
- `npm run lint` – Run ESLint (if configured)

For deeper Android debug/build steps, see `apps/mobile/README.md`.

---

## Shared Packages (`packages/*`)

Currently placeholders for future shared code:

- `packages/shared-types` – central TypeScript types/interfaces
- `packages/ui-components` – cross-platform UI components
- `packages/utils` – shared utility functions

Once populated, you can:

- Publish them to a private registry, **or**
- Use local workspace linking (e.g., pnpm/yarn workspaces, npm workspaces) and import them into `apps/*` and `services/*`.

---

## Services (`services/*`)

Skeleton services for backend processing and ML:

- `services/ml-service` – Python-based ML service
- `services/worker` – background jobs / queues

Recommended next steps per service:

- Create a `README.md` explaining:
  - How to create a virtualenv / install deps
  - How to run the service (e.g. `uvicorn`, `celery`, custom scripts)
  - How it connects to `apps/api` (HTTP, gRPC, message queue, etc.)

---

## Development Workflow

- Run **API**:
  ```bash
  cd apps/api
  npm run dev
  ```

- Run **Web**:
  ```bash
  cd apps/web
  npm start
  ```

- Run **Mobile (Android)**:
  ```bash
  cd apps/mobile
  npm start        # Metro
  npm run android  # in another terminal
  ```

You can develop all three in parallel by using separate terminals for each app.


