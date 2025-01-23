import { PrismaClient, ClubMember } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function generateClubMembers(countByClub: number) {
    const clubMembers = await generateClubMember(countByClub);
    const prisma = new PrismaClient();
    await prisma.clubMember.createMany({data: clubMembers});
    await prisma.$disconnect();
}

async function generateClubMember(countByClub: number) {

    const prisma = new PrismaClient();
    const clubs = await prisma.club.findMany();
    const membersId: number[] = [];
    const members: ClubMember[] = [];

    // Owners are members
    for (const club of clubs) {
        const memberId = club.ownerId;
        members.push({
            clubId: club.id,
            userId: memberId,
            createdAt: club.createdAt,
            updatedAt: club.createdAt
        })
        membersId.push(memberId);
    }

    // Generate members
    for (const club of clubs) {
        for (let i = 0; i < countByClub; i++) {
            let memberId = faker.number.int({min: 1, max: 15000});
            while (membersId.includes(memberId)) {
                memberId = faker.number.int({min: 1, max: 15000});
            }
            members.push({
                clubId: club.id,
                userId: memberId,
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent()
            });
            membersId.push(memberId);
        }
    }

    await prisma.$disconnect();
    return members;
}