import { Router } from "express";
import {obtenerTareas, obtenerTareaPorId,crearTarea,actualizarTarea,eliminarTarea} from "../controllers/task.controller.js";
import validate from "../middlewares/validate.js";
import {validarCrearTarea,validarActualizarTarea,validarIdTarea} from "../middlewares/validations/task.validation.js";

const router = Router();

router.get("/", obtenerTareas);
router.get("/:id",validarIdTarea,validate,obtenerTareaPorId);
router.post("/",validarCrearTarea,validate,crearTarea);
router.put("/:id",validarActualizarTarea,validate,actualizarTarea);
router.delete("/:id",validarIdTarea, validate,eliminarTarea);

export default router;