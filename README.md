# SUMMIT INTEGRATED HEALTH SYSTEM (SIHS)

Production-oriented modular hospital information system for Kenyan healthcare operations.

## Stack

- Frontend: Next.js 14 + Tailwind + TanStack React Query + Zustand
- Backend: Node.js 20 + Express (controllers + services per module) + JWT + RBAC + Zod
- Database: PostgreSQL + Prisma ORM
- Ops: Docker Compose (Postgres + API + web)

## Node.js and npm

This repo expects **Node.js 20+** and **npm 10+** (see root `package.json` `engines` and `.nvmrc`).

If `npm` is not found on Windows, install **Node.js LTS** from [https://nodejs.org](https://nodejs.org) (npm ships with Node), then reopen your terminal.

Install all workspace dependencies:

```bash
npm run install:all
```

## Project structure

- `backend/`: REST API (`/api/v1`-style paths under `/api/...`), Prisma schema, migrations, seed
- `frontend/`: App Router UI, React Query hooks in `frontend/hooks/`
- `docker-compose.yml`: Postgres, API, Next.js

## Backend modules (controller + service)

Each domain has `*.routes.ts` (validation + wiring), `*.controller.ts`, and `*.service.ts` plus `*.schemas.ts` where needed.

- Auth (register, login, **refresh**, logout)
- Patients (EHR) — optional `nhifNumber`, `shaMemberNumber` on patient
- Appointments (double-booking + emergency override)
- Medical records
- Labs (verification + critical alerts)
- Pharmacy
- **Billing** — Kenyan insurance model: NHIF legacy / SHA (UHC) payors, claim status workflow, copay vs approved amounts
- Admin dashboard aggregate
- Reporting analytics
- AI triage routing

## Authentication

- **Access token**: JWT (`Authorization: Bearer …`), payload includes `typ: "access"` (legacy tokens without `typ` still work).
- **Refresh token**: opaque, stored hashed (`RefreshToken` table), rotated on `/api/auth/refresh`.
- **Endpoints**: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`.

## Security

- Password hashing: bcrypt
- RBAC middleware per route
- Zod input validation
- Audit logs (auth request bodies are redacted)

## Database

1. Copy `backend/.env.example` → `backend/.env` and set `DATABASE_URL` / `JWT_SECRET`.
2. Generate client and apply migrations:

```bash
cd backend
npx prisma generate
npx prisma migrate deploy
```

3. Seed roles, users, sample patients, and a SHA-facing billing row:

```bash
npx prisma db seed
```

Default password for all seeded users: `ChangeMe!234` (change immediately in production).

### Kenyan billing / insurance (NHIF & SHA)

- **Patient**: optional `nhifNumber` (legacy NHIF) and `shaMemberNumber` (Social Health Authority / UHC).
- **Billing line**: `payorType` (`CASH`, `NHIF`, `SHA`, `PRIVATE`, `CORPORATE`), `insuranceClaimStatus` (e.g. `SUBMITTED_TO_SHA`, `SUBMITTED_TO_NHIF`, `PENDING_VERIFICATION`, `SETTLED`), monetary splits `patientCopayKes`, `insurerApprovedKes`, and `claimNotes` for EDI / manual reconciliation.

## Frontend API layer

- `frontend/lib/api-client.ts` — base URL `NEXT_PUBLIC_API_URL`, attaches Bearer token, auto-refreshes on 401 using `/api/auth/refresh`.
- Hooks in `frontend/hooks/` (`usePatients`, `useLogin`, `useAdminDashboard`, `useBillingList`, `useAiRoute`, etc.).

Copy `frontend/.env.example` → `frontend/.env.local` when needed.

## Run locally

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

- API: `http://localhost:4000`
- UI: `http://localhost:3000`

## Docker Compose

```bash
docker compose up --build
```

- Postgres: `localhost:5432` (`postgres` / `postgres`, DB `sihs`)
- API: `localhost:4000`
- Web: `localhost:3000`

After containers are up, run migrations (already on API startup) and optionally seed **from the host** (same `DATABASE_URL` as local Postgres port mapping):

```bash
cd backend
set DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sihs
npx prisma db seed
```

## Main REST endpoints

- `/api/auth` — register, login, refresh, logout
- `/api/patients`
- `/api/appointments`
- `/api/records`
- `/api/labs`
- `/api/pharmacy`
- `/api/billing`
- `/api/admin/dashboard`
- `/api/reports/analytics`
- `/api/ai/route`
