import express from "express";
import {
    crearPreferencias,
    obtenerPreferencias,
    actualizarPreferencias,
    eliminarPreferencias
} from "../controllers/preferencias.controller.js";

import validate from "../middlewares/validate.js";

import {
    validarCrearPreferencias,
    validarActualizarPreferencias,
    validarIdPreferencias
} from "../middlewares/validations/preferencias.validation.js";

const router = express.Router();

router.post("/", validarCrearPreferencias, validate, crearPreferencias);

router.get("/", obtenerPreferencias);

router.put(
    "/:id",
    validarActualizarPreferencias,
    validate,
    actualizarPreferencias
);

router.delete(
    "/:id",
    validarIdPreferencias,
    validate,
    eliminarPreferencias
);

export default router;