import cors from "cors";
import express from "express";
import { seedPersons } from "./data/seed.js";
import { listPersons } from "./domain/person.js";

const PORT = Number(process.env.PORT ?? 43121);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

/** Temporary read-only seed preview until Phase 2 adds GET /persons. */
app.get("/dev/seed", (_req, res) => {
  res.status(200).json(listPersons(seedPersons));
});

app.listen(PORT, "127.0.0.1", () => {
  process.stdout.write(`Address Book API (Phase 1) on http://127.0.0.1:${PORT}\n`);
});
