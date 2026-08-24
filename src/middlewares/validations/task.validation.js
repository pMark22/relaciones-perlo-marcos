import { body, param } from "express-validator";

const validarCrearTarea = [
    body("title")
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El título no puede tener más de 100 caracteres"),

    body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .isLength({ max: 100 })
        .withMessage("La descripción no puede tener más de 100 caracteres"),

    body("userId")
        .notEmpty()
        .withMessage("El userId es obligatorio")
        .isInt()
        .withMessage("El userId debe ser un número entero"),

    body("isComplete")
        .optional()
        .isBoolean()
        .withMessage("El campo isComplete debe ser un valor booleano")
];

const validarActualizarTarea = [
    param("id")
        .isInt()
        .withMessage("El ID debe ser un número entero"),

    body("title")
        .optional()
        .notEmpty()
        .withMessage("El título no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("El título no puede tener más de 100 caracteres"),

    body("description")
        .optional()
        .notEmpty()
        .withMessage("La descripción no puede estar vacía")
        .isLength({ max: 100 })
        .withMessage("La descripción no puede tener más de 100 caracteres"),

    body("isComplete")
        .optional()
        .isBoolean()
        .withMessage("El campo isComplete debe ser un valor booleano")
];

const validarIdTarea = [
    param("id")
        .isInt()
        .withMessage("El ID debe ser un número entero")
];

export {validarCrearTarea,validarActualizarTarea,validarIdTarea};