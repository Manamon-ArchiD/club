import { PrismaClient, Request } from '@prisma/client';
import { faker } from '@faker-js/faker';

type RequestCreateInputWithoutId = Omit<Request, 'id'>;

export async function generateRequests(maxCount: number) {
    const requests = await generateRequest(maxCount);
    const prisma = new PrismaClient();
    await prisma.request.createMany({ data: requests });
    await prisma.$disconnect();
}

async function generateRequest(maxCount: number): Promise<RequestCreateInputWithoutId[]> {
    const prisma = new PrismaClient();
    const clubs = await prisma.club.findMany();
    const requests: RequestCreateInputWithoutId[] = [];
    let requestsCount = 0;

    for (const club of clubs) {
        const clubMembers = await prisma.clubMember.findMany({
            where: {
                clubId: club.id,
            },
        }).then(res => res.map((item) => item.userId));

        const count = Math.min(faker.number.int({ min: 0, max: 2 }), maxCount - requestsCount);

        for (let i = 0; i < count; i++) {
            let userId = faker.number.int({ min: 1, max: 15000 });
            while (clubMembers.includes(userId)) {
                userId = faker.number.int({ min: 1, max: 15000 });
            }

            requests.push({
                clubId: club.id,
                userId: userId,
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            });
            requestsCount++;
        }

        if (requestsCount >= maxCount) {
            break;
        }
    }

    await prisma.$disconnect();
    return requests;
}