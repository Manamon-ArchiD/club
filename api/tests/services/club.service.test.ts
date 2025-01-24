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

  it("createClub", async () => {
    const createdAt = new Date();

    // Configuration du mock
    (prisma.club.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Mock Club A",
      level: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
      ownerId: 1,
    });

    const club = await ClubService.createClub("Mock Club A", 1, 1);
    expect(club).toEqual({
      id: 1,
      name: "Mock Club A",
      level: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
      ownerId: 1,
    });
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
      ownerId: 1,
    });

    const club = await ClubService.getClubById(1);
    expect(club).toEqual({
      id: 1,
      name: "Mock Club A",
      level: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
      ownerId: 1,
    });
  });

  it("updateClub", async () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    updatedAt.setMinutes(updatedAt.getMinutes() + 1);

    // Configuration du mock
    (prisma.club.update as jest.Mock).mockResolvedValue({
      id: 1,
      name: "New Mock Club A",
      level: 2,
      createdAt: createdAt,
      updatedAt: updatedAt,
      ownerId: 1,
    });

    const club = await ClubService.updateClub(1, 1, {
      name: "New Mock Club A",
      level: 2,
    });
    expect(club).toEqual({
      id: 1,
      name: "New Mock Club A",
      level: 2,
      createdAt: createdAt,
      updatedAt: updatedAt,
      ownerId: 1,
    });
  });

  it("sendInvitation", async () => {
    const createdAt = new Date();

    // Configuration du mock
    (prisma.invitation.create as jest.Mock).mockResolvedValue({
      clubId: 1,
      inviterId: 1,
      userId: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    const club = await ClubService.sendInvitation(1, 1, 1);
    expect(club).toEqual({
      clubId: 1,
      inviterId: 1,
      userId: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
    });
  });

  it("sendJoinRequest", async () => {
    const createdAt = new Date();

    // Configuration du mock
    (prisma.request.create as jest.Mock).mockResolvedValue({
      clubId: 1,
      userId: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    const club = await ClubService.sendJoinRequest(1, 1);
    expect(club).toEqual({
      clubId: 1,
      userId: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
    });
  });

  it("getJoinRequests", async () => {
    const createdAt = new Date();

    // Configuration du mock
    (prisma.request.findMany as jest.Mock).mockResolvedValue({
      clubId: 1,
      userId: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    const club = await ClubService.getJoinRequests(1);
    expect(club).toEqual({
      clubId: 1,
      userId: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
    });
  });
});
