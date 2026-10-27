# Address Book

Browse seeded contacts via a small Express API and a responsive React client.

## Summary

For this take-home exercise, I built a small Address Book app comprised of a contact list and a details page for each person. You can view people from an in-memory store, open a contact’s details (name, phone, and optional email/address), and toggle sorting by last or first name. The API and UI run locally from this repo, and the server domain and HTTP layer are covered by Jest tests.

I kept the final submission intentionally lean so the architecture and walkthrough stay easy to follow. Stretch goals are listed under the “Given more time” section below.

## Approach

Sorting and display logic live in a small set of pure TypeScript helpers (`sortByName`, `listPersons`, `displayName`) so they’re easy to unit-test without running the API server or a browser. An in-memory store and Express routes use those helpers, and the React client calls the API with `fetch`.

Stack: Node/Express + TypeScript on the server; React, Vite, React Router, Tailwind, and shadcn/ui on the client.

## Features implemented

- Contacts seeded in-memory (usable on first run)
- `GET /persons` with optional `?sort=first|last` (default: last name)
- `GET /persons/:id` with `404` when missing
- Responsive list and details UI with loading, empty, and error states
- Sort toggle (last or first name) on the list
- Jest tests for domain helpers, store, and HTTP API (supertest)

## Running locally

Requires Node.js 20+.

```bash
npm run install:all
npm run dev
```

| Service | URL |
| --- | --- |
| API | http://127.0.0.1:43121 |
| Client | http://127.0.0.1:43122 |

Quick check: open the client, click a contact to open details, use Back, then flip the Last/First sort switch and confirm the order changes.

### Other scripts:

```bash
npm test              # server Jest suite
npm run typecheck     # server tsc + client production build
npm run dev:server    # API only
npm run dev:client    # Vite only
```

## Deploying to the cloud

I did not deploy a live environment, but a straightforward distributed setup would be:

1. Host the Express API on a Node-friendly service like Railway, Fly.io, or Render.
2. Set `PORT` via the host’s env config.
3. Build the client with `VITE_API_BASE` pointing at the public API URL (`npm run build --prefix client`).
4. Serve `client/dist` as static assets on Vercel, Netlify, or Cloudflare Pages.

Rough effort for a first cloud deploy of the current app would be about half a day including DNS/env smoke checks.

## Given more time

### Features

| What I would add | Rough effort |
| --- | --- |
| Create / edit / delete contacts (forms + POST/PUT/DELETE) | ~0.5–1 day |
| List search (`?q=`) with matching UI | ~2–4 hours |
| Persist to SQLite or Postgres | ~0.5–1 day |
| Ship the cloud deploy path above | ~0.5 day |
| Auth (only if multi-user were required) | ~1–2 days |

### Robustness

- Replace the in-memory store with a real DB and migrations (data currently resets on restart)
- Share Person types/schema (e.g. Zod) between server and client
- Structured request logging and a consistent error envelope
- Frontend tests (component tests and one Playwright smoke covering the list, details, and sorting)
- Rate limiting and tighter input validation if the API were public
- CI on every push: install, `npm test`, `npm run typecheck`
