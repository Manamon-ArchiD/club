import { PrismaClient, Club } from "@prisma/client";
import { faker } from "@faker-js/faker";

type ClubCreateInputWithoutId = Omit<Club, "id">;

export async function generateClubs(count: number) {
  const clubs = generateClub(count);
  const prisma = new PrismaClient();
  await prisma.club.createMany({ data: clubs });
  await prisma.$disconnect();
}

function generateClub(count: number) {
  const clubs: ClubCreateInputWithoutId[] = [];
  const owners: number[] = [];
  for (let i = 0; i < count; i++) {
    // Unique owner
    let ownerId = faker.number.int({ min: 1, max: 5000 });
    while (owners.includes(ownerId)) {
      ownerId = faker.number.int({ min: 1, max: 5000 });
    }
    owners.push(ownerId);

    // Save club
    clubs.push({
      name: faker.animal.petName() + " " + faker.color.human(),
      level: faker.number.int({ min: 1, max: 25 }),
      ownerId: ownerId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return clubs;
}
