export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
};

export const displayName = (person: Person): string =>
  `${person.firstName} ${person.lastName}`.trim();

const compareIgnoreCase = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { sensitivity: "base" });

/** Sort by last name, then first name (case-insensitive). */
export const sortByName = (persons: readonly Person[]): Person[] =>
  [...persons].sort((left, right) => {
    const byLast = compareIgnoreCase(left.lastName, right.lastName);
    if (byLast !== 0) {
      return byLast;
    }
    return compareIgnoreCase(left.firstName, right.firstName);
  });

/** Return persons sorted by name. */
export const listPersons = (persons: readonly Person[]): Person[] =>
  sortByName(persons);
