import { Request, Response, Router } from "express";
import ClubService from "../services/club.service";

const router = Router();

/**
 * @route POST /club
 * @desc Créer un club
 */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { name, level, ownerId } = req.body;

  if (!name || !ownerId || level === undefined) {
    return res
      .status(400)
      .json({ message: "Nom, niveau et propriétaire requis." });
  }

  try {
    const newClub = await ClubService.createClub(name, level, ownerId);
    res.status(201).json(newClub);
  } catch (error) {
    console.error("Erreur lors de la création du club :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

/**
 * @route GET /club/:id
 * @desc Récupérer les informations d'un club
 */
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const clubId = parseInt(req.params.id);
  if (isNaN(clubId)) {
    return res.status(400).json({ message: "ID invalide." });
  }

  try {
    const club = await ClubService.getClubById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club non trouvé." });
    }
    res.json(club);
  } catch (error) {
    console.error("Erreur lors de la récupération du club :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

/**
 * @route PUT /club/:id
 * @desc Modifier les informations d'un club (seul le propriétaire peut modifier)
 */
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  const clubId = parseInt(req.params.id);
  const { name, level, ownerId } = req.body;

  if (isNaN(clubId) || !ownerId) {
    return res
      .status(400)
      .json({ message: "ID invalide ou propriétaire manquant." });
  }

  try {
    const updatedClub = await ClubService.updateClub(clubId, ownerId, {
      name,
      level,
    });
    res.json(updatedClub);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du club :", error);
    res.status(403).json({ message: error.message });
  }
});

/**
 * @route POST /club/:id/invite
 * @desc Envoyer une invitation à un utilisateur pour rejoindre le club
 */
router.post(
  "/:id/invite",
  async (req: Request, res: Response): Promise<any> => {
    const clubId = parseInt(req.params.id);
    const { inviterId, userId } = req.body;

    if (isNaN(clubId) || !inviterId || !userId) {
      return res.status(400).json({
        message: "ID du club ou ID de l'hôte ou ID de l'utilisateur manquant.",
      });
    }

    try {
      const invitation = await ClubService.sendInvitation(
        clubId,
        inviterId,
        userId
      );
      res
        .status(201)
        .json({ message: "Invitation envoyée avec succès", invitation });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'invitation :", error);
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @route POST /club/:id/request
 * @desc Envoyer une demande d'adhésion au club
 */
router.post(
  "/:id/request",
  async (req: Request, res: Response): Promise<any> => {
    const clubId = parseInt(req.params.id);
    const { userId } = req.body;

    if (isNaN(clubId) || !userId) {
      return res
        .status(400)
        .json({ message: "ID du club ou ID de l'utilisateur manquant." });
    }

    try {
      const request = await ClubService.sendJoinRequest(clubId, userId);
      res
        .status(201)
        .json({ message: "Demande d'adhésion envoyée avec succès", request });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande d'adhésion :", error);
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @route GET /club/:id/request
 * @desc Récupérer toutes les demandes d'adhésion dans un club
 */
router.get(
  "/:id/request",
  async (req: Request, res: Response): Promise<any> => {
    const clubId = parseInt(req.params.id);

    if (isNaN(clubId)) {
      return res.status(400).json({ message: "ID du club invalide." });
    }

    try {
      const requests = await ClubService.getJoinRequests(clubId);
      if (requests.length === 0) {
        return res
          .status(404)
          .json({ message: "Aucune demande d'adhésion trouvée." });
      }
      res.status(200).json({ requests });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des demandes d'adhésion :",
        error
      );
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
