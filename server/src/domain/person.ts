export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
};

/** Primary sort field for the contacts list. */
export type SortBy = "first" | "last";

export const displayName = (person: Person): string =>
  `${person.firstName} ${person.lastName}`.trim();

const compareIgnoreCase = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { sensitivity: "base" });

const primaryName = (person: Person, sortBy: SortBy): string =>
  sortBy === "first" ? person.firstName : person.lastName;

const secondaryName = (person: Person, sortBy: SortBy): string =>
  sortBy === "first" ? person.lastName : person.firstName;

/** Sort by primary name, then the other name (case-insensitive). Defaults to last name. */
export const sortByName = (
  persons: readonly Person[],
  sortBy: SortBy = "last",
): Person[] =>
  [...persons].sort((left, right) => {
    const byPrimary = compareIgnoreCase(
      primaryName(left, sortBy),
      primaryName(right, sortBy),
    );
    if (byPrimary !== 0) {
      return byPrimary;
    }
    return compareIgnoreCase(
      secondaryName(left, sortBy),
      secondaryName(right, sortBy),
    );
  });

/** Return persons sorted by the chosen name field. */
export const listPersons = (
  persons: readonly Person[],
  sortBy: SortBy = "last",
): Person[] => sortByName(persons, sortBy);

export const parseSortBy = (value: unknown): SortBy =>
  value === "first" ? "first" : "last";
