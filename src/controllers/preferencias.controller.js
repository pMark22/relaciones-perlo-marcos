import Preferencias from "../models/preferencias.model.js";
import User from "../models/user.model.js";

const crearPreferencias = async (req, res) => {
    try {
        const { tema, idioma, userId } = req.body;

        if (!tema || !idioma || !userId) {
            return res.status(400).json({
                mensaje: "Tema, idioma y userId son obligatorios"
            });
        }

        const usuario = await User.findByPk(userId);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const preferenciasExistentes = await Preferencias.findOne({
            where: { userId }
        });

        if (preferenciasExistentes) {
            return res.status(400).json({
                mensaje: "El usuario ya tiene preferencias"
            });
        }

        const preferencias = await Preferencias.create({
            tema,
            idioma,
            userId
        });

        res.status(201).json({
            mensaje: "Preferencias creadas correctamente",
            datos: preferencias
        });

    } catch (error) {
        console.error("Error al crear preferencias:", error);

        res.status(500).json({
            mensaje: "Error al crear preferencias",
            error: error.message
        });
    }
};

const obtenerPreferencias = async (req, res) => {
    try {
        const preferencias = await Preferencias.findAll({
            attributes: ["id", "tema", "idioma", "userId"],
            include: {
                model: User,
                as: "usuario",
                attributes: ["id", "name", "email"]
            }
        });

        res.status(200).json({
            mensaje: "Preferencias obtenidas correctamente",
            datos: preferencias
        });

    } catch (error) {
        console.error("Error al obtener preferencias:", error);

        res.status(500).json({
            mensaje: "Error al obtener preferencias",
            error: error.message
        });
    }
};

export {
    crearPreferencias,
    obtenerPreferencias
};