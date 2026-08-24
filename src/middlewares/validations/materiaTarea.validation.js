import { body } from "express-validator";

const validarAsignarTarea = [
    body("materiaId")
        .notEmpty()
        .withMessage("El materiaId es obligatorio")
        .isInt()
        .withMessage("El materiaId debe ser un número entero"),

    body("tareaId")
        .notEmpty()
        .withMessage("El tareaId es obligatorio")
        .isInt()
        .withMessage("El tareaId debe ser un número entero")
];

export {validarAsignarTarea};