import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ClubService {
  /**
   * Créer un club
   */
  async createClub(name: string, level: number, ownerId: number) {
    return await prisma.club.create({
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
    return await prisma.club.findUnique({
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
    data: { name?: string; level?: number }
  ) {
    const club = await prisma.club.findUnique({
      where: { id: clubId },
    });

    if (!club) throw new Error("Club non trouvé.");
    if (club.ownerId !== ownerId) throw new Error("Accès refusé.");

    return await prisma.club.update({
      where: { id: clubId },
      data,
    });
  }
}

export default new ClubService();
