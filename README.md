# Address Book

Full-stack Address Book interview take-home: a REST API plus a responsive React client.

## Status

**Phase 1** — scaffold + Person domain + seed data. Read-only list/detail API and UI come next.

## Stack

- **Server:** Node.js, Express, TypeScript, in-memory seed data, Jest
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

Temporary Phase 1 endpoints:

- `GET /health`
- `GET /dev/seed` — sorted seed contacts (replaced by `/persons` in Phase 2)

## What’s implemented (Phase 1)

- `server/` + `client/` packages and root scripts
- Pure Person domain (`sortByName`, `listPersons`, `displayName`)
- Seed dataset
- Placeholder client that loads seed contacts
- Domain Jest tests
