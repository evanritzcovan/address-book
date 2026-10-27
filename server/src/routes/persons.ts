import { Router, type Request, type Response } from "express";
import type { PersonStore } from "../store/personStore.js";

export const createPersonsRouter = (store: PersonStore): Router => {
  const router = Router();

  router.get("/", (_req: Request, res: Response) => {
    res.status(200).json(store.list());
  });

  router.get("/:id", (req: Request, res: Response) => {
    const person = store.getById(req.params.id);
    if (!person) {
      res.status(404).json({ error: "Person not found" });
      return;
    }
    res.status(200).json(person);
  });

  return router;
};
