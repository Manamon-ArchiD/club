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

export default router;
