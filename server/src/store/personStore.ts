import {
  listPersons,
  type Person,
  type SortBy,
} from "../domain/person.js";

export type PersonStore = {
  list: (sortBy?: SortBy) => Person[];
  getById: (id: string) => Person | undefined;
};

export const createPersonStore = (
  initial: readonly Person[] = [],
): PersonStore => {
  const persons: Person[] = initial.map((person) => ({ ...person }));

  return {
    list: (sortBy = "last") => listPersons(persons, sortBy),
    getById: (id) => persons.find((person) => person.id === id),
  };
};
