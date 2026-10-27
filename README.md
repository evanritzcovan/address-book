# Address Book

Full-stack Address Book interview take-home: a REST API plus a responsive React client.

## Status

**Phase 2** — read-only `/persons` API with in-memory store. List + detail UI comes in Phase 3.

## Stack

- **Server:** Node.js, Express, TypeScript, in-memory seed store, Jest + supertest
- **Client:** React, Vite, TypeScript, Tailwind, shadcn/ui

## Run locally

```bash
npm run install:all
npm run dev:server   # http://127.0.0.1:43121
npm run dev:client   # http://127.0.0.1:43122
```

```bash
npm test
```

## API

| Method | Path | Success |
| --- | --- | --- |
| `GET` | `/health` | `200` |
| `GET` | `/persons` | `200` |
| `GET` | `/persons/:id` | `200` / `404` |

## What’s implemented

- Pure Person domain helpers (`sortByName`, `listPersons`, `displayName`)
- In-memory store seeded on boot
- Read-only REST list + detail
- Placeholder client still on seed preview wiring until Phase 3
- Domain, store, and API Jest tests
