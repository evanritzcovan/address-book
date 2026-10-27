import type { Person, SortBy } from "@/types/person";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:43121";

const request = async <T>(path: string): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`);
  } catch {
    throw new Error("Unable to reach the API");
  }

  if (response.status === 404) {
    throw new Error("Person not found");
  }

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as T;
};

export const fetchPersons = async (
  sortBy: SortBy = "last",
): Promise<Person[]> => {
  const params = sortBy === "first" ? "?sort=first" : "";
  return request<Person[]>(`/persons${params}`);
};

export const fetchPerson = async (id: string): Promise<Person> =>
  request<Person>(`/persons/${encodeURIComponent(id)}`);
