import {
  displayName,
  listPersons,
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
  it("sorts by last name then first name, case-insensitive", () => {
    const people: Person[] = [
      { id: "1", firstName: "Zoe", lastName: "Adams", phone: "1" },
      { id: "2", firstName: "Ann", lastName: "adams", phone: "2" },
      { id: "3", firstName: "Ben", lastName: "Brown", phone: "3" },
    ];

    expect(sortByName(people).map((person) => person.id)).toEqual([
      "2",
      "1",
      "3",
    ]);
  });

  it("does not mutate the input array", () => {
    const people: Person[] = [
      { id: "1", firstName: "Zoe", lastName: "Yang", phone: "1" },
      { id: "2", firstName: "Ann", lastName: "Able", phone: "2" },
    ];
    const copy = [...people];
    sortByName(people);
    expect(people).toEqual(copy);
  });
});

describe("listPersons", () => {
  it("returns persons sorted by name", () => {
    const people: Person[] = [
      { id: "1", firstName: "Zoe", lastName: "Yang", phone: "555-1" },
      { id: "2", firstName: "Ann", lastName: "Able", phone: "555-2" },
      { id: "3", firstName: "Bo", lastName: "Able", phone: "555-3" },
    ];

    expect(listPersons(people).map((p) => p.id)).toEqual(["2", "3", "1"]);
  });
});
