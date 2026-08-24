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

export { asignarTarea };