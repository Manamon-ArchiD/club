import { PrismaClient } from "@prisma/client";
import ClubService from "@/services/club.service";

jest.mock("@prisma/client", () => {
    const mockPrismaClient = {
        club: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

const prisma = new PrismaClient();

describe("ClubService", () => {
    it("getAll", async () => {

        const createdAt = new Date();

        // Configuration du mock
        (prisma.club.findMany as jest.Mock).mockResolvedValue([
            {
                id: 1,
                name: "Mock Club A",
                level: 1,
                createdAt: createdAt,
                updatedAt: createdAt,
                ownerId: 1
            },
            {
                id: 2,
                name: "Mock Club B",
                level: 2,
                createdAt: createdAt,
                updatedAt: createdAt,
                ownerId: 2
            }
        ]);

        const clubs = await ClubService.getAll();
        expect(clubs).toEqual([
            {
                id: 1,
                name: "Mock Club A",
                level: 1,
                createdAt: createdAt,
                updatedAt: createdAt,
                ownerId: 1
            },
            {
                id: 2,
                name: "Mock Club B",
                level: 2,
                createdAt: createdAt,
                updatedAt: createdAt,
                ownerId: 2
            }
        ]);
    });

    it("getClubById", async () => {
        const createdAt = new Date();

        // Configuration du mock
        (prisma.club.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            name: "Mock Club A",
            level: 1,
            createdAt: createdAt,
            updatedAt: createdAt,
            ownerId: 1
        });

        const club = await ClubService.getClubById(1);
        expect(club).toEqual({
            id: 1,
            name: "Mock Club A",
            level: 1,
            createdAt: createdAt,
            updatedAt: createdAt,
            ownerId: 1
        });
    });

    it("updateClubById", async () => {
        const createdAt = new Date();
        const updatedAt = new Date();
        updatedAt.setMinutes(updatedAt.getMinutes() + 1);

        // Configuration du mock
        (prisma.club.update as jest.Mock).mockResolvedValue({
            id: 1,
            name: "Mock Club A",
            level: 2,
            createdAt: createdAt,
            updatedAt: updatedAt,
            ownerId: 1
        });

        const club = await ClubService.updateClubById(1, { name: "Mock Club A", level: 2 });
        expect(club).toEqual({
            id: 1,
            name: "New Mock Club A",
            level: 2,
            createdAt: createdAt,
            updatedAt: updatedAt,
            ownerId: 1
        });
    });


});
