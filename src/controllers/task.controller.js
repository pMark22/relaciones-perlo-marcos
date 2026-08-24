import { matchedData } from "express-validator";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";

const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Task.findAll({
            include: {
                model: User,
                as: "author",
                attributes: ["id", "name", "email"]
            }
        });

        res.status(200).json({
            mensaje: "Tareas obtenidas correctamente",
            datos: tareas
        });
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({
            mensaje: "Error al obtener tareas",
            error: error.message
        });
    }
};

const obtenerTareaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const tarea = await Task.findByPk(id, {
            include: {
                model: User,
                as: "author",
                attributes: ["id", "name", "email"]
            }
        });

        if (!tarea) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        res.status(200).json({
            mensaje: "Tarea obtenida correctamente",
            datos: tarea
        });
    } catch (error) {
        console.error("Error al obtener tarea:", error);
        res.status(500).json({
            mensaje: "Error al obtener tarea",
            error: error.message
        });
    }
};

const crearTarea = async (req, res) => {
    try {
        const datos = matchedData(req);

        const usuario = await User.findByPk(datos.userId);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario indicado no existe"
            });
        }

        const tareaExistente = await Task.findOne({
            where: { title: datos.title }
        });

        if (tareaExistente) {
            return res.status(400).json({
                mensaje: "Ya existe una tarea con ese título"
            });
        }

        if (datos.isComplete === undefined) {
            datos.isComplete = false;
        }

        const nuevaTarea = await Task.create(datos);

        res.status(201).json({
            mensaje: "Tarea creada correctamente",
            datos: nuevaTarea
        });

    } catch (error) {
        console.error("Error al crear tarea:", error);

        res.status(500).json({
            mensaje: "Error al crear tarea",
            error: error.message
        });
    }
};

const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const datos = matchedData(req);

        const tarea = await Task.findByPk(id);

        if (!tarea) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        if (datos.title && datos.title !== tarea.title) {
            const tareaExistente = await Task.findOne({
                where: {
                    title: datos.title,
                    id: { [Op.ne]: id }
                }
            });

            if (tareaExistente) {
                return res.status(400).json({
                    mensaje: "Ya existe una tarea con ese título"
                });
            }
        }

        await tarea.update(datos);

        res.status(200).json({
            mensaje: "Tarea actualizada correctamente",
            datos: tarea
        });

    } catch (error) {
        console.error("Error al actualizar tarea:", error);

        res.status(500).json({
            mensaje: "Error al actualizar tarea",
            error: error.message
        });
    }
};

const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const tarea = await Task.findByPk(id);

        if (!tarea) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        await tarea.destroy();

        res.status(200).json({
            mensaje: "Tarea eliminada correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).json({
            mensaje: "Error al eliminar tarea",
            error: error.message
        });
    }
};

export {
    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};