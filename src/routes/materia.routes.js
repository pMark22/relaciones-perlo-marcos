import express from "express";
import {
    crearMateria,
    obtenerMaterias,
    actualizarMateria,
    eliminarMateria
} from "../controllers/materia.controller.js";

import validate from "../middlewares/validate.js";

import {
    validarCrearMateria,
    validarActualizarMateria,
    validarIdMateria
} from "../middlewares/validations/materia.validation.js";

const router = express.Router();

router.post("/", validarCrearMateria, validate, crearMateria);

router.get("/", obtenerMaterias);

router.put(
    "/:id",
    validarActualizarMateria,
    validate,
    actualizarMateria
);

router.delete(
    "/:id",
    validarIdMateria,
    validate,
    eliminarMateria
);

export default router;