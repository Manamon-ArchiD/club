import { PrismaClient, Invitation } from "@prisma/client";
import { faker } from "@faker-js/faker";

type InvitationCreateInputWithoutId = Omit<Invitation, "id">;

export async function generateInvitations(maxCount: number) {
    const invitations = await generateInvitation(maxCount); // Assurez-vous que cette fonction renvoie un tableau résolu
    const prisma = new PrismaClient();
    await prisma.invitation.createMany({ data: invitations });
    await prisma.$disconnect();
}

async function generateInvitation(maxCount: number): Promise<InvitationCreateInputWithoutId[]> {
    const prisma = new PrismaClient();
    const clubs = await prisma.club.findMany();
    const invitations: InvitationCreateInputWithoutId[] = [];
    let invitationsCount = 0;

    for (const club of clubs) {
        const clubMembers = await prisma.clubMember.findMany({
            where: {
                clubId: club.id,
            },
        }).then(res => res.map((item) => item.userId));

        const count = faker.number.int({ min: 0, max: 2 });

        for (let i = 0; i < count; i++) {
            invitations.push({
                clubId: club.id,
                inviterId: club.ownerId,
                userId: clubMembers.length > 0 ? clubMembers[faker.number.int({ min: 0, max: clubMembers.length - 1 })] : 1,
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            });

            invitationsCount += 1;
            if (invitationsCount >= maxCount) {
                break;
            }
        }

        if (invitationsCount >= maxCount) {
            break;
        }
    }

    await prisma.$disconnect();
    return invitations;
}
