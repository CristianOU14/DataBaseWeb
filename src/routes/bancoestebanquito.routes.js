import { Router } from "express";
import { metodosUsuarios } from "../controllers/usuario.controllers.js";
import { metodosTransaccion } from "../controllers/transaccion.controllers.js";
import { metodosPrestamos } from "../controllers/prestamo.controllers.js";
import { metodosReportes } from "../controllers/reporte.controllers.js";
const router = Router();

// Routes

router.get("/users",metodosUsuarios.getUsuarios);
router.get("/user",metodosUsuarios.getUsuario);
router.get("/transfers",metodosTransaccion.getTransacciones);
router.get("/transfer",metodosTransaccion.getTransaccion);
router.get("/loans",metodosPrestamos.getPrestamos);
router.get("/loan",metodosPrestamos.getPrestamo);
router.get("/reports",metodosReportes.getReportes);
router.get("/report",metodosReportes.getReporte);
//router.get("/register",metodosBanco.pushUser);
export default router;