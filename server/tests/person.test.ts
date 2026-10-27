import {
  displayName,
  listPersons,
  parseSortBy,
  sortByName,
  type Person,
} from "../src/domain/person.js";

const sample: Person = {
  id: "1",
  firstName: "Ava",
  lastName: "Nguyen",
  phone: "555-0101",
  email: "ava@example.com",
  address: "12 Cedar Lane",
};

describe("displayName", () => {
  it("joins first and last name", () => {
    expect(displayName(sample)).toBe("Ava Nguyen");
  });
});

describe("sortByName", () => {
  const people: Person[] = [
    { id: "1", firstName: "Zoe", lastName: "Adams", phone: "1" },
    { id: "2", firstName: "Ann", lastName: "adams", phone: "2" },
    { id: "3", firstName: "Ben", lastName: "Brown", phone: "3" },
  ];

  it("sorts by last name then first name by default", () => {
    expect(sortByName(people).map((person) => person.id)).toEqual([
      "2",
      "1",
      "3",
    ]);
  });

  it("sorts by first name then last name when requested", () => {
    expect(sortByName(people, "first").map((person) => person.id)).toEqual([
      "2",
      "3",
      "1",
    ]);
  });

  it("does not mutate the input array", () => {
    const copy = [...people];
    sortByName(people, "first");
    expect(people).toEqual(copy);
  });
});

describe("listPersons", () => {
  it("honors the sortBy argument", () => {
    const people: Person[] = [
      { id: "1", firstName: "Zoe", lastName: "Adams", phone: "555-1" },
      { id: "2", firstName: "Ann", lastName: "Adams", phone: "555-2" },
      { id: "3", firstName: "Ben", lastName: "Brown", phone: "555-3" },
    ];

    expect(listPersons(people, "last").map((p) => p.id)).toEqual([
      "2",
      "1",
      "3",
    ]);
    expect(listPersons(people, "first").map((p) => p.id)).toEqual([
      "2",
      "3",
      "1",
    ]);
  });
});

describe("parseSortBy", () => {
  it("accepts first and defaults everything else to last", () => {
    expect(parseSortBy("first")).toBe("first");
    expect(parseSortBy("last")).toBe("last");
    expect(parseSortBy(undefined)).toBe("last");
    expect(parseSortBy("nope")).toBe("last");
  });
});
