import express from "express";
import {
    asignarTarea,
    actualizarMateriaTarea,
    eliminarMateriaTarea
} from "../controllers/materiaTarea.controller.js";

import validate from "../middlewares/validate.js";

import {
    validarAsignarTarea,
    validarActualizarMateriaTarea,
    validarIdMateriaTarea
} from "../middlewares/validations/materiaTarea.validation.js";

const router = express.Router();

router.post(
    "/",
    validarAsignarTarea,
    validate,
    asignarTarea
);

router.put(
    "/:id",
    validarActualizarMateriaTarea,
    validate,
    actualizarMateriaTarea
);

router.delete(
    "/:id",
    validarIdMateriaTarea,
    validate,
    eliminarMateriaTarea
);

export default router;