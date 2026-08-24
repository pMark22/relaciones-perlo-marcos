import express from "express";
import {crearMateria,obtenerMaterias} from "../controllers/materia.controller.js";
import validate from "../middlewares/validate.js";
import {validarCrearMateria} from "../middlewares/validations/materia.validation.js";

const router = express.Router();

router.post("/",validarCrearMateria,validate,crearMateria);
router.get("/", obtenerMaterias);

export default router;