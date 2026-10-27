import { seedPersons } from "../src/data/seed.js";
import { listPersons } from "../src/domain/person.js";

describe("seedPersons", () => {
  it("contains unique ids", () => {
    const ids = seedPersons.map((person) => person.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("contains required fields on every record", () => {
    seedPersons.forEach((person) => {
      expect(person.id.length).toBeGreaterThan(0);
      expect(person.firstName.length).toBeGreaterThan(0);
      expect(person.lastName.length).toBeGreaterThan(0);
      expect(person.phone.length).toBeGreaterThan(0);
    });
  });

  it("lists in name order via listPersons", () => {
    const listed = listPersons(seedPersons);
    const names = listed.map(
      (person) => `${person.lastName}|${person.firstName}`,
    );
    expect(names).toEqual(
      [...names].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" }),
      ),
    );
  });
});
