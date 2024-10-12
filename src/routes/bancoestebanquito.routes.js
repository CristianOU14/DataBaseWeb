import { Router } from "express";
import { metodosBanco } from "../controllers/database.controllers.js";
const router = Router();

// Routes

router.get("/user",metodosBanco.getUsuarios);
router.get("/transfer",metodosBanco.getTransacciones);
router.get("/loan",metodosBanco.getPrestamos);
router.get("/report",metodosBanco.getReportes);
export default router;