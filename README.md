# Address Book

Full-stack take-home: a small REST API and a responsive React client for browsing an address book.

## Summary

Build an Address Book where a user can see a list of people and open a detail view for a selected person (first name, last name, phone, plus optional email/address). The solution uses a custom backend, runs locally from this repo, and is covered by automated server tests.

## Approach

Keep a **thin functional domain** (`sortByName`, `listPersons`, `displayName`) that is easy to unit-test. An in-memory store and Express routes are adapters over that core; the React client is another adapter that calls the API with `fetch`.

Scope stays close to the brief: **list + detail**, with a first/last name sort toggle. Create/update/delete, search, auth, and a real database are deferred (see below) so the walkthrough stays focused.

## Stack

- **Server:** Node.js, Express, TypeScript, in-memory seed store, Jest + supertest
- **Client:** React, Vite, TypeScript, React Router, Tailwind CSS, shadcn/ui

## Features implemented

- Seeded in-memory contacts (demoable on first run)
- `GET /persons` (optional `?sort=first|last`, default last name) and `GET /persons/:id`
- Responsive list → detail UI with loading, empty, and error states
- Sort toggle (last ↔ first) on the list
- Jest tests for domain helpers, store, and HTTP API

## Run locally

Requires Node.js 20+.

```bash
npm run install:all
npm run dev
```

| Service | URL |
| --- | --- |
| API | http://127.0.0.1:43121 |
| Client | http://127.0.0.1:43122 |

Useful scripts:

```bash
npm test              # server Jest suite
npm run typecheck     # server tsc + client production build
npm run dev:server    # API only
npm run dev:client    # Vite only
```

## API

| Method | Path | Success |
| --- | --- | --- |
| `GET` | `/health` | `200` `{ "ok": true }` |
| `GET` | `/persons?sort=first\|last` | `200` person array (default `last`) |
| `GET` | `/persons/:id` | `200` person / `404` `{ "error": "Person not found" }` |

## Project layout

```
server/   Express API, domain, store, Jest tests
client/   Vite + React UI
```

## Given more time — features

| Item | Rough effort |
| --- | --- |
| Create / edit / delete contacts (forms + POST/PUT/DELETE) | ~0.5–1 day |
| List search (`?q=`) with matching UI | ~2–4 hours |
| Persist to SQLite or Postgres | ~0.5–1 day |
| Deploy API + static client (e.g. Railway/Fly + Vercel/Netlify) | ~0.5 day |
| Auth (if multi-user were required) | ~1–2 days |

## Given more time — robustness

- Replace in-memory store with a real DB and migrations; data currently resets on restart
- Shared Person types/schema (e.g. Zod) between server and client
- Structured request logging and consistent error envelope
- Frontend tests (component + one Playwright smoke: list → detail → sort)
- Rate limiting / tighter input validation if the API were public
- CI (install, test, typecheck) on every push

## Cloud deploy (bonus / future)

Not implemented for this submission. A straightforward path would be: containerize or run the Express API on a small Node host, build the client with `VITE_API_BASE` pointing at that API, and serve the Vite `dist/` as static assets (or same-origin behind a reverse proxy to avoid CORS).
