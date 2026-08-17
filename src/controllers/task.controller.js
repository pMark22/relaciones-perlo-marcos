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
        const { title, description, isComplete, userId } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                mensaje: "El título y la descripción son obligatorios"
            });
        }

        if (!userId) {
            return res.status(400).json({
                mensaje: "El userId es obligatorio"
            });
        }

        const usuario = await User.findByPk(userId);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario indicado no existe"
            });
        }

        if (title.length > 100) {
            return res.status(400).json({
                mensaje: "El título no puede tener más de 100 caracteres"
            });
        }

        if (description.length > 100) {
            return res.status(400).json({
                mensaje: "La descripción no puede tener más de 100 caracteres"
            });
        }

        if (isComplete !== undefined && typeof isComplete !== "boolean") {
            return res.status(400).json({
                mensaje: "El campo isComplete debe ser un valor booleano"
            });
        }

        const tareaExistente = await Task.findOne({
            where: { title }
        });

        if (tareaExistente) {
            return res.status(400).json({
                mensaje: "Ya existe una tarea con ese título"
            });
        }

        const nuevaTarea = await Task.create({
            title,
            description,
            isComplete: isComplete ?? false,
            userId
        });

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
        const { title, description, isComplete } = req.body;

        const tarea = await Task.findByPk(id);

        if (!tarea) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        if (title !== undefined) {
            if (title.length > 100) {
                return res.status(400).json({
                    mensaje: "El título no puede tener más de 100 caracteres"
                });
            }

            if (title !== tarea.title) {
                const tareaExistente = await Task.findOne({
                    where: {
                        title,
                        id: { [Op.ne]: id }
                    }
                });

                if (tareaExistente) {
                    return res.status(400).json({
                        mensaje: "Ya existe una tarea con ese título"
                    });
                }
            }
        }

        if (description !== undefined && description.length > 100) {
            return res.status(400).json({
                mensaje: "La descripción no puede tener más de 100 caracteres"
            });
        }

        if (isComplete !== undefined && typeof isComplete !== "boolean") {
            return res.status(400).json({
                mensaje: "El campo isComplete debe ser un valor booleano"
            });
        }

        const datosActualizar = {};

        if (title !== undefined) datosActualizar.title = title;
        if (description !== undefined) datosActualizar.description = description;
        if (isComplete !== undefined) datosActualizar.isComplete = isComplete;

        await tarea.update(datosActualizar);

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