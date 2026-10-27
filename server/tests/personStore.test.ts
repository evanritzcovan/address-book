import { createPersonStore } from "../src/store/personStore.js";
import type { Person } from "../src/domain/person.js";

const seed: Person[] = [
  {
    id: "seed-1",
    firstName: "Ava",
    lastName: "Nguyen",
    phone: "555-0101",
  },
  {
    id: "seed-2",
    firstName: "Ben",
    lastName: "Ortiz",
    phone: "555-0142",
    email: "ben@example.com",
  },
];

describe("createPersonStore", () => {
  it("lists seeded persons sorted by name", () => {
    const store = createPersonStore(seed);
    expect(store.list().map((person) => person.id)).toEqual([
      "seed-1",
      "seed-2",
    ]);
  });

  it("returns a person by id", () => {
    const store = createPersonStore(seed);
    expect(store.getById("seed-2")?.firstName).toBe("Ben");
  });

  it("returns undefined for a missing id", () => {
    const store = createPersonStore(seed);
    expect(store.getById("missing")).toBeUndefined();
  });
});
