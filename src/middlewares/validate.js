import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Error de validación",
            errores: errors.array()
        });
    }

    next();
};

export default validate;