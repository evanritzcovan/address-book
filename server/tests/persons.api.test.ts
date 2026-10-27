import request from "supertest";
import { createApp } from "../src/app.js";
import { createPersonStore } from "../src/store/personStore.js";
import type { Person } from "../src/domain/person.js";

const seed: Person[] = [
  {
    id: "seed-1",
    firstName: "Ava",
    lastName: "Nguyen",
    phone: "555-0101",
    email: "ava@example.com",
  },
  {
    id: "seed-2",
    firstName: "Ben",
    lastName: "Ortiz",
    phone: "555-0142",
  },
];

const buildApp = () => createApp({ store: createPersonStore(seed) });

describe("GET /health", () => {
  it("returns ok", async () => {
    const response = await request(buildApp()).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});

describe("GET /persons", () => {
  it("returns sorted persons", async () => {
    const response = await request(buildApp()).get("/persons");
    expect(response.status).toBe(200);
    expect(response.body.map((person: Person) => person.id)).toEqual([
      "seed-1",
      "seed-2",
    ]);
  });
});

describe("GET /persons/:id", () => {
  it("returns a person", async () => {
    const response = await request(buildApp()).get("/persons/seed-1");
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe("Ava");
  });

  it("returns 404 when missing", async () => {
    const response = await request(buildApp()).get("/persons/missing");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Person not found" });
  });
});
