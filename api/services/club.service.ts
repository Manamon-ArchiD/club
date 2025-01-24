import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ClubService {
  /**
   * Créer un club
   */
  async createClub(name: string, level: number, ownerId: number) {
    return prisma.club.create({
      data: {
        name,
        level,
        ownerId,
      },
    });
  }

  /**
   * Récupérer les informations d'un club par son ID
   */
  async getClubById(clubId: number) {
    return prisma.club.findUnique({
      where: { id: clubId },
      include: {
        ClubMembers: true,
        Invitations: true,
        Requests: true,
      },
    });
  }

  /**
   * Modifier les informations d'un club (seul l'owner peut modifier)
   */
  async updateClub(
    clubId: number,
    ownerId: number,
    data: { name?: string; level?: number; ownerId?: number }
  ) {
    const club = await prisma.club.findUnique({
      where: { id: clubId },
    });

    if (!club) throw new Error("Club non trouvé.");
    if (club.ownerId !== ownerId) throw new Error("Accès refusé.");

    return prisma.club.update({
      where: { id: clubId },
      data,
    });
  }

  async sendInvitation(clubId: number, inviterId: number, userId: number) {
    return await prisma.invitation.create({
      data: {
        clubId,
        inviterId,
        userId,
      },
    });
  }

  async sendJoinRequest(clubId: number, userId: number) {
    return await prisma.request.create({
      data: {
        clubId,
        userId,
      },
    });
  }

  async getJoinRequests(clubId: number) {
    // Récupère toutes les demandes d'adhésion pour un club spécifique
    return await prisma.request.findMany({
      where: {
        clubId,
      },
    });
  }
}

export default new ClubService();
