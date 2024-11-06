import { Router } from "express";
import { metodosUsuarios } from "../controllers/usuario.controllers.js";
import { metodosTransaccion } from "../controllers/transaccion.controllers.js";
import { metodosPrestamos } from "../controllers/prestamo.controllers.js";
import { metodosReportes } from "../controllers/reporte.controllers.js";
import { metodosRegister } from "../controllers/register.controllers.js";
import { metodosTransferencia } from "../controllers/transferencia.controllers.js";
import cors from 'cors'
const router = Router();

// Routes

router.get("/users",metodosUsuarios.getUsuarios);
router.post("/user", cors({origin: "http://localhost:5173"}), metodosUsuarios.getUsuario);
router.get("/transfers",metodosTransaccion.getTransacciones);
router.post("/transfer",cors({origin: "http://localhost:5173"}),metodosTransaccion.getTransaccion);
router.get("/loans",metodosPrestamos.getPrestamos);
router.get("/loan",metodosPrestamos.getPrestamo);
router.get("/reports",metodosReportes.getReportes);
router.get("/report",metodosReportes.getReporte);
router.post("/register",cors({origin: "http://localhost:5173"}),metodosRegister.registerUser);
router.post("/transferir",cors({origin: "http://localhost:5173"}),metodosTransferencia.registerTransferencia);
export default router;