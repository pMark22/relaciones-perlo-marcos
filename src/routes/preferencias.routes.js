import express from "express";
import { crearPreferencias, obtenerPreferencias } from "../controllers/preferencias.controller.js";
import validate from "../middlewares/validate.js";
import { validarCrearPreferencias } from "../middlewares/validations/preferencias.validation.js";

const router = express.Router();

router.post("/", validarCrearPreferencias, validate, crearPreferencias);
router.get("/", obtenerPreferencias);

export default router;