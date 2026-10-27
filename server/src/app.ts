import cors from "cors";
import express, { type Express } from "express";
import { seedPersons } from "./data/seed.js";
import { createPersonsRouter } from "./routes/persons.js";
import { createPersonStore, type PersonStore } from "./store/personStore.js";

export type AppOptions = {
  store?: PersonStore;
};

export const createApp = (options: AppOptions = {}): Express => {
  const store = options.store ?? createPersonStore(seedPersons);
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use("/persons", createPersonsRouter(store));

  return app;
};
