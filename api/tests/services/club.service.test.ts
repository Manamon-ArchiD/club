import { PrismaClient } from "@prisma/client";
import ClubService from "@/services/club.service";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    club: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    invitation: {
      create: jest.fn(),
    },
    request: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

const prisma = new PrismaClient();

describe("ClubService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createClub", () => {
    it("should create a club", async () => {
      const createdAt = new Date();

      (prisma.club.create as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Mock Club A",
        level: 1,
        createdAt,
        updatedAt: createdAt,
        ownerId: 1,
      });

      const club = await ClubService.createClub("Mock Club A", 1, 1);

      expect(prisma.club.create).toHaveBeenCalledWith({
        data: {
          name: "Mock Club A",
          level: 1,
          ownerId: 1,
        },
      });

      expect(club).toEqual({
        id: 1,
        name: "Mock Club A",
        level: 1,
        createdAt,
        updatedAt: createdAt,
        ownerId: 1,
      });
    });

    it("should throw an error if creation fails", async () => {
      (prisma.club.create as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(ClubService.createClub("Mock Club A", 1, 1)).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("getClubById", () => {
    it("should return a club by ID", async () => {
      const createdAt = new Date();

      (prisma.club.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Mock Club A",
        level: 1,
        createdAt,
        updatedAt: createdAt,
        ownerId: 1,
      });

      const club = await ClubService.getClubById(1);

      expect(prisma.club.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          ClubMembers: true,
          Invitations: true,
          Requests: true,
        },
      });

      expect(club).toEqual({
        id: 1,
        name: "Mock Club A",
        level: 1,
        createdAt,
        updatedAt: createdAt,
        ownerId: 1,
      });
    });

    it("should return null if club not found", async () => {
      (prisma.club.findUnique as jest.Mock).mockResolvedValue(null);

      const club = await ClubService.getClubById(99);
      expect(club).toBeNull();
    });
  });

  describe("updateClub", () => {
    it("should update a club", async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      updatedAt.setMinutes(updatedAt.getMinutes() + 1);

      (prisma.club.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Mock Club A",
        level: 1,
        ownerId: 1,
      });

      (prisma.club.update as jest.Mock).mockResolvedValue({
        id: 1,
        name: "New Mock Club A",
        level: 2,
        createdAt,
        updatedAt,
        ownerId: 1,
      });

      const club = await ClubService.updateClub(1, 1, {
        name: "New Mock Club A",
        level: 2,
      });

      expect(prisma.club.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: "New Mock Club A", level: 2 },
      });

      expect(club).toEqual({
        id: 1,
        name: "New Mock Club A",
        level: 2,
        createdAt,
        updatedAt,
        ownerId: 1,
      });
    });

    it("should throw an error if club is not found", async () => {
      (prisma.club.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        ClubService.updateClub(1, 1, { name: "New Mock Club A", level: 2 })
      ).rejects.toThrow("Club non trouvé.");
    });

    it("should throw an error if update fails", async () => {
      (prisma.club.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Mock Club A",
        level: 1,
        ownerId: 1,
      });

      (prisma.club.update as jest.Mock).mockRejectedValue(
        new Error("Update failed")
      );

      await expect(
        ClubService.updateClub(1, 1, { name: "New Mock Club A", level: 2 })
      ).rejects.toThrow("Update failed");
    });
  });

  describe("sendInvitation", () => {
    it("should send an invitation", async () => {
      const createdAt = new Date();

      (prisma.invitation.create as jest.Mock).mockResolvedValue({
        id: 1,
        clubId: 1,
        inviterId: 1,
        userId: 2,
        createdAt,
        updatedAt: createdAt,
      });

      const invitation = await ClubService.sendInvitation(1, 1, 2);

      expect(prisma.invitation.create).toHaveBeenCalledWith({
        data: {
          clubId: 1,
          inviterId: 1,
          userId: 2,
        },
      });

      expect(invitation).toEqual({
        id: 1,
        clubId: 1,
        inviterId: 1,
        userId: 2,
        createdAt,
        updatedAt: createdAt,
      });
    });
  });

  describe("sendJoinRequest", () => {
    it("should create a join request", async () => {
      const createdAt = new Date();

      (prisma.request.create as jest.Mock).mockResolvedValue({
        id: 1,
        clubId: 1,
        userId: 2,
        createdAt,
        updatedAt: createdAt,
      });

      const request = await ClubService.sendJoinRequest(1, 2);

      expect(prisma.request.create).toHaveBeenCalledWith({
        data: {
          clubId: 1,
          userId: 2,
        },
      });

      expect(request).toEqual({
        id: 1,
        clubId: 1,
        userId: 2,
        createdAt,
        updatedAt: createdAt,
      });
    });
  });

  describe("getJoinRequests", () => {
    it("should get join requests for a club", async () => {
      const createdAt = new Date();

      (prisma.request.findMany as jest.Mock).mockResolvedValue([
        {
          id: 1,
          clubId: 1,
          userId: 2,
          createdAt,
          updatedAt: createdAt,
        },
      ]);

      const requests = await ClubService.getJoinRequests(1);

      expect(prisma.request.findMany).toHaveBeenCalledWith({
        where: { clubId: 1 },
      });

      expect(requests).toEqual([
        {
          id: 1,
          clubId: 1,
          userId: 2,
          createdAt,
          updatedAt: createdAt,
        },
      ]);
    });

    it("should return an empty array if no requests found", async () => {
      (prisma.request.findMany as jest.Mock).mockResolvedValue([]);

      const requests = await ClubService.getJoinRequests(99);
      expect(requests).toEqual([]);
    });
  });
});
