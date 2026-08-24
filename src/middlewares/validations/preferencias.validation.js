import { body, param } from "express-validator";

const validarCrearPreferencias = [
    body("tema")
        .notEmpty()
        .withMessage("El tema es obligatorio")
        .isLength({ max: 20 })
        .withMessage("El tema no puede tener más de 20 caracteres"),

    body("idioma")
        .notEmpty()
        .withMessage("El idioma es obligatorio")
        .isLength({ max: 20 })
        .withMessage("El idioma no puede tener más de 20 caracteres"),

    body("userId")
        .notEmpty()
        .withMessage("El userId es obligatorio")
        .isInt()
        .withMessage("El userId debe ser un número entero")
];

export {validarCrearPreferencias};