// src/faker.js
import { faker } from "@faker-js/faker";
import { companies } from "./companies";

export function generateProjects() {
  return companies.map((company) => ({
    id: faker.string.uuid(),
    company,
    members: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }).map(
      () => faker.image.avatar()
    ),
    completion: faker.number.int({ min: 20, max: 100 }),
  }));
}
