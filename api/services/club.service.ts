import { PrismaClient, Club } from "@prisma/client";

const prisma = new PrismaClient();

export class ClubService {

    async getAll() {
        return prisma.club.findMany();
    }

    async getClubById(id: number) {
        return null
    }

    async updateClubById(id: number, data: Partial<Club>) {
        return null;
    }
}

export default new ClubService();
