import { matchedData } from "express-validator";
import Preferencias from "../models/preferencias.model.js";
import User from "../models/user.model.js";

const crearPreferencias = async (req, res) => {
    try {
        const datos = matchedData(req);

        const usuario = await User.findByPk(datos.userId);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const preferenciasExistentes = await Preferencias.findOne({
            where: { userId: datos.userId }
        });

        if (preferenciasExistentes) {
            return res.status(400).json({
                mensaje: "El usuario ya tiene preferencias"
            });
        }

        const preferencias = await Preferencias.create(datos);

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

const actualizarPreferencias = async (req, res) => {
    try {
        const { id } = req.params;

        const datos = matchedData(req);

        const preferencias = await Preferencias.findByPk(id);

        if (!preferencias) {
            return res.status(404).json({
                mensaje: "Preferencias no encontradas"
            });
        }

        await preferencias.update(datos);

        res.status(200).json({
            mensaje: "Preferencias actualizadas correctamente",
            datos: preferencias
        });

    } catch (error) {
        console.error("Error al actualizar preferencias:", error);

        res.status(500).json({
            mensaje: "Error al actualizar preferencias",
            error: error.message
        });
    }
};

const eliminarPreferencias = async (req, res) => {
    try {
        const { id } = req.params;

        const preferencias = await Preferencias.findByPk(id);

        if (!preferencias) {
            return res.status(404).json({
                mensaje: "Preferencias no encontradas"
            });
        }

        await preferencias.destroy();

        res.status(200).json({
            mensaje: "Preferencias eliminadas correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar preferencias:", error);

        res.status(500).json({
            mensaje: "Error al eliminar preferencias",
            error: error.message
        });
    }
};

export {
    crearPreferencias,
    obtenerPreferencias,
    actualizarPreferencias,
    eliminarPreferencias
};