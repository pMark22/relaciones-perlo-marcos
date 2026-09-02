import { matchedData } from "express-validator";
import Materia from "../models/materia.model.js";
import Task from "../models/task.model.js";
import MateriaTarea from "../models/materiaTarea.model.js";

const asignarTarea = async (req, res) => {
    try {
        const datos = matchedData(req);

        const materia = await Materia.findByPk(datos.materiaId);

        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            });
        }

        const tarea = await Task.findByPk(datos.tareaId);

        if (!tarea) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        const relacionExistente = await MateriaTarea.findOne({
            where: {
                materiaId: datos.materiaId,
                tareaId: datos.tareaId
            }
        });

        if (relacionExistente) {
            return res.status(400).json({
                mensaje: "La tarea ya está asignada a esta materia"
            });
        }

        const relacion = await MateriaTarea.create(datos);

        res.status(201).json({
            mensaje: "Tarea asignada a la materia correctamente",
            datos: relacion
        });

    } catch (error) {
        console.error("Error al asignar tarea:", error);

        res.status(500).json({
            mensaje: "Error al asignar tarea",
            error: error.message
        });
    }
};

const actualizarMateriaTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const datos = matchedData(req);

        const relacion = await MateriaTarea.findByPk(id);

        if (!relacion) {
            return res.status(404).json({
                mensaje: "Relación no encontrada"
            });
        }

        if (datos.materiaId) {
            const materia = await Materia.findByPk(datos.materiaId);

            if (!materia) {
                return res.status(404).json({
                    mensaje: "Materia no encontrada"
                });
            }
        }

        if (datos.tareaId) {
            const tarea = await Task.findByPk(datos.tareaId);

            if (!tarea) {
                return res.status(404).json({
                    mensaje: "Tarea no encontrada"
                });
            }
        }

        const materiaId = datos.materiaId ?? relacion.materiaId;
        const tareaId = datos.tareaId ?? relacion.tareaId;

        const relacionExistente = await MateriaTarea.findOne({
            where: {
                materiaId,
                tareaId
            }
        });

        if (relacionExistente && relacionExistente.id !== relacion.id) {
            return res.status(400).json({
                mensaje: "La relación ya existe"
            });
        }

        await relacion.update(datos);

        res.status(200).json({
            mensaje: "Relación actualizada correctamente",
            datos: relacion
        });

    } catch (error) {
        console.error("Error al actualizar relación:", error);

        res.status(500).json({
            mensaje: "Error al actualizar relación",
            error: error.message
        });
    }
};

const eliminarMateriaTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const relacion = await MateriaTarea.findByPk(id);

        if (!relacion) {
            return res.status(404).json({
                mensaje: "Relación no encontrada"
            });
        }

        await relacion.destroy();

        res.status(200).json({
            mensaje: "Relación eliminada correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar relación:", error);

        res.status(500).json({
            mensaje: "Error al eliminar relación",
            error: error.message
        });
    }
};

export {
    asignarTarea,
    actualizarMateriaTarea,
    eliminarMateriaTarea
};