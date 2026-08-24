import express from "express";
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { validarCrearUsuario, validarIdUsuario, validarActualizarUsuario } from "../middlewares/validations/user.validation.js";

const router = express.Router();

router.post("/", validarCrearUsuario, validate, crearUsuario);
router.get("/", obtenerUsuarios);
router.get("/:id", validarIdUsuario, validate, obtenerUsuarioPorId);
router.put("/:id", validarActualizarUsuario, validate, actualizarUsuario);
router.delete("/:id", validarIdUsuario, validate, eliminarUsuario);

export default router;