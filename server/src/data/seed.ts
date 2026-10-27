import type { Person } from "../domain/person.js";

/** Demo contacts so the app is usable before any CRUD UI exists. */
export const seedPersons: Person[] = [
  {
    id: "seed-1",
    firstName: "Ava",
    lastName: "Nguyen",
    phone: "555-0101",
    email: "ava.nguyen@example.com",
    address: "12 Cedar Lane, Portland, OR",
  },
  {
    id: "seed-2",
    firstName: "Ben",
    lastName: "Ortiz",
    phone: "555-0142",
    email: "ben.ortiz@example.com",
  },
  {
    id: "seed-3",
    firstName: "Chloe",
    lastName: "Patel",
    phone: "555-0199",
    address: "88 Market Street, Austin, TX",
  },
  {
    id: "seed-4",
    firstName: "Diego",
    lastName: "Ramirez",
    phone: "555-0177",
    email: "diego.ramirez@example.com",
    address: "401 Lakeview Rd, Chicago, IL",
  },
  {
    id: "seed-5",
    firstName: "Elena",
    lastName: "Schmidt",
    phone: "555-0110",
  },
];
