import type { Person } from "../domain/person.js";

/** Demo contacts chosen so first-name vs last-name sort orders visibly differ. */
export const seedPersons: Person[] = [
  {
    id: "seed-1",
    firstName: "Zoe",
    lastName: "Baker",
    phone: "503-555-0101",
    email: "zoe.baker@example.com",
    address: "12 Cedar Lane, Portland, OR",
  },
  {
    id: "seed-2",
    firstName: "Amy",
    lastName: "Chen",
    phone: "415-555-0142",
    email: "amy.chen@example.com",
  },
  {
    id: "seed-3",
    firstName: "Marcus",
    lastName: "Abel",
    phone: "512-555-0199",
    address: "88 Market Street, Austin, TX",
  },
  {
    id: "seed-4",
    firstName: "Priya",
    lastName: "Young",
    phone: "312-555-0177",
    email: "priya.young@example.com",
    address: "401 Lakeview Rd, Chicago, IL",
  },
  {
    id: "seed-5",
    firstName: "Liam",
    lastName: "Davis",
    phone: "212-555-0110",
  },
];
