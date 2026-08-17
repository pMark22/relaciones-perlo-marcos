import express from "express";
import {
    crearPreferencias,
    obtenerPreferencias
} from "../controllers/preferencias.controller.js";

const router = express.Router();

router.post("/", crearPreferencias);
router.get("/", obtenerPreferencias);

export default router;