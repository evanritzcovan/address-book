import { listPersons, type Person } from "../domain/person.js";

export type PersonStore = {
  list: () => Person[];
  getById: (id: string) => Person | undefined;
};

export const createPersonStore = (
  initial: readonly Person[] = [],
): PersonStore => {
  const persons: Person[] = initial.map((person) => ({ ...person }));

  return {
    list: () => listPersons(persons),
    getById: (id) => persons.find((person) => person.id === id),
  };
};
