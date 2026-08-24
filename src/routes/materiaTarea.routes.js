import express from "express";
import { asignarTarea} from "../controllers/materiaTarea.controller.js";
import validate from "../middlewares/validate.js";
import {validarAsignarTarea} from "../middlewares/validations/materiaTarea.validation.js";

const router = express.Router();

router.post( "/", validarAsignarTarea,validate, asignarTarea);

export default router;