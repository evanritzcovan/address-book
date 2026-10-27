export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
};

export type SortBy = "first" | "last";
