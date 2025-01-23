import { PrismaClient } from "@prisma/client";
import { generateClubs } from "./scripts/club.script";
import { generateClubMembers } from "./scripts/clubMember.script";
import { generateInvitations } from "./scripts/invitation.script";
import { generateRequests } from "./scripts/request.script";


const CLUBS_COUNT = 500;
const MEMBERS_PER_CLUB_COUNT = 10;
const INVITATIONS_COUNT = 50;
const REQUESTS_COUNT = 120;

(async () => {
    const prisma = new PrismaClient();

    console.log("[0] Data generation cleanup started...");
    await prisma.invitation.deleteMany();
    await prisma.request.deleteMany();
    await prisma.clubMember.deleteMany();
    await prisma.club.deleteMany();
    await prisma.$disconnect();
    console.log("[0] Data generation cleanup finished.");

    console.log("Data generation started...");

    console.log("[1] Generating clubs...");
    await generateClubs(CLUBS_COUNT).then(res => console.log("[1] Clubs generated."));

    console.log("[2] Generating club members...");
    await generateClubMembers(MEMBERS_PER_CLUB_COUNT).then(res => console.log("[2] Club members generated."));

    console.log("[3] Generating invitations...");
    await generateInvitations(INVITATIONS_COUNT).then(res => console.log("[3] Invitations generated."));

    console.log("[4] Generating requests...");
    await generateRequests(REQUESTS_COUNT).then(res => console.log("[4] Requests generated."));

})();