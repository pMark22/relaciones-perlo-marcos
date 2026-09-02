import { body, param } from "express-validator";

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

const validarActualizarMateriaTarea = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo"),

    body("materiaId")
        .optional()
        .isInt()
        .withMessage("El materiaId debe ser un número entero"),

    body("tareaId")
        .optional()
        .isInt()
        .withMessage("El tareaId debe ser un número entero")
];

const validarIdMateriaTarea = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
];

export {
    validarAsignarTarea,
    validarActualizarMateriaTarea,
    validarIdMateriaTarea
};