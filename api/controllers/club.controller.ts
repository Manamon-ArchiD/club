import { Request, Response, Router } from "express";

// Création du routeur
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        // TODO
        res.json({});
    } catch (error) {
        res.status(500).json({});
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const clubId = parseInt(req.params.id);
    try {
        // TODO
        res.json({});
    } catch (error) {
        res.status(500).json({});
    }
});

export default router;
