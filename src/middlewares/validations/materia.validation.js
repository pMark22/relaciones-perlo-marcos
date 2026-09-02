import { body, param } from "express-validator";

const validarCrearMateria = [
    body("nombre")
        .notEmpty()
        .withMessage("El nombre de la materia es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede tener más de 100 caracteres")
];

const validarActualizarMateria = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo"),

    body("nombre")
        .optional()
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede tener más de 100 caracteres")
];

const validarIdMateria = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
];

export {
    validarCrearMateria,
    validarActualizarMateria,
    validarIdMateria
};