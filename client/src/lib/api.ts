import type { Person } from "@/types/person";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:43121";

export const fetchPersons = async (): Promise<Person[]> => {
  const response = await fetch(`${API_BASE}/persons`);
  if (!response.ok) {
    throw new Error(`Failed to load persons (${response.status})`);
  }
  return response.json() as Promise<Person[]>;
};
