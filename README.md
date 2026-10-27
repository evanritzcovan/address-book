# Address Book

Full-stack Address Book interview take-home: a REST API plus a responsive React client.

## Status

**Lean MVP** — list contacts and open a detail view. Create/edit/delete and search are out of scope (noted as future work).

## Stack

- **Server:** Node.js, Express, TypeScript, in-memory seed store, Jest + supertest
- **Client:** React, Vite, TypeScript, React Router, Tailwind, shadcn/ui

## Run locally

```bash
npm run install:all
npm run dev
```

- API: http://127.0.0.1:43121
- Client: http://127.0.0.1:43122

```bash
npm test
```

## API

| Method | Path | Success |
| --- | --- | --- |
| `GET` | `/health` | `200` |
| `GET` | `/persons?sort=first\|last` | `200` (default `last`) |
| `GET` | `/persons/:id` | `200` / `404` |

## What’s implemented

- Pure Person domain helpers (`sortByName`, `listPersons`, `displayName`)
- In-memory store seeded on boot
- Read-only REST list + detail
- Responsive list → detail UI with loading / empty / error states
- Server Jest tests (domain, store, API)

## Deliverables checklist

- [x] Deployment / running instructions (local)
- [ ] Summary of the assignment
- [ ] Overall approach
- [ ] Features implemented
- [ ] Given more time — what else
- [ ] Given more time — robustness
- [x] Runnable locally with automated server tests
