import { body } from "express-validator";

const validarCrearMateria = [
    body("nombre")
        .notEmpty()
        .withMessage("El nombre de la materia es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede tener más de 100 caracteres")
];

export {
    validarCrearMateria
};