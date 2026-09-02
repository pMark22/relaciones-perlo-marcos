import { body, param } from "express-validator";
import User from "../../models/user.model.js";

const validarCrearUsuario = [
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede tener más de 100 caracteres")
        .custom((name) => {
            if (/\d/.test(name)) {
                throw new Error("El nombre no puede contener números");
            }

            return true;
        }),

    body("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("El email debe tener un formato válido")
        .isLength({ max: 100 })
        .withMessage("El email no puede tener más de 100 caracteres")
        .custom(async (email) => {
            const usuarioExistente = await User.findOne({
                where: { email }
            });

            if (usuarioExistente) {
                throw new Error("El email ya está registrado");
            }

            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 6, max: 100 })
        .withMessage("La contraseña debe tener entre 6 y 100 caracteres")
];

const validarIdUsuario = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
        .custom(async (id) => {
            const usuario = await User.findByPk(id);

            if (!usuario) {
                throw new Error("El usuario no existe");
            }

            return true;
        })
];

const validarActualizarUsuario = [
    ...validarIdUsuario,

    body("name")
        .optional()
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede tener más de 100 caracteres")
        .custom((name) => {
            if (/\d/.test(name)) {
                throw new Error("El nombre no puede contener números");
            }

            return true;
        }),

    body("email")
        .optional()
        .isEmail()
        .withMessage("El email debe tener un formato válido")
        .isLength({ max: 100 })
        .withMessage("El email no puede tener más de 100 caracteres")
        .custom(async (email, { req }) => {
            const usuarioExistente = await User.findOne({
                where: { email }
            });

            if (
                usuarioExistente &&
                usuarioExistente.id !== Number(req.params.id)
            ) {
                throw new Error("El email ya está registrado por otro usuario");
            }

            return true;
        }),

    body("password")
        .optional()
        .isLength({ min: 6, max: 100 })
        .withMessage("La contraseña debe tener entre 6 y 100 caracteres")
];

export {
    validarCrearUsuario,
    validarIdUsuario,
    validarActualizarUsuario
};