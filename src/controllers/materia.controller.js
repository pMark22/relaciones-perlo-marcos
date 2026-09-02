import { matchedData } from "express-validator";
import Materia from "../models/materia.model.js";
import Task from "../models/task.model.js";

const crearMateria = async (req, res) => {
    try {
        const datos = matchedData(req);

        const materiaExistente = await Materia.findOne({
            where: { nombre: datos.nombre }
        });

        if (materiaExistente) {
            return res.status(400).json({
                mensaje: "La materia ya existe"
            });
        }

        const nuevaMateria = await Materia.create(datos);

        res.status(201).json({
            mensaje: "Materia creada correctamente",
            datos: nuevaMateria
        });

    } catch (error) {
        console.error("Error al crear materia:", error);

        res.status(500).json({
            mensaje: "Error al crear materia",
            error: error.message
        });
    }
};

const obtenerMaterias = async (req, res) => {
    try {
        const materias = await Materia.findAll({
            include: {
                model: Task,
                as: "tareas",
                attributes: ["id", "title", "description", "isComplete"]
            }
        });

        res.status(200).json({
            mensaje: "Materias obtenidas correctamente",
            datos: materias
        });

    } catch (error) {
        console.error("Error al obtener materias:", error);

        res.status(500).json({
            mensaje: "Error al obtener materias",
            error: error.message
        });
    }
};

const actualizarMateria = async (req, res) => {
    try {
        const { id } = req.params;

        const datos = matchedData(req);

        const materia = await Materia.findByPk(id);

        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            });
        }

        if (datos.nombre && datos.nombre !== materia.nombre) {
            const materiaExistente = await Materia.findOne({
                where: {
                    nombre: datos.nombre
                }
            });

            if (materiaExistente) {
                return res.status(400).json({
                    mensaje: "La materia ya existe"
                });
            }
        }

        await materia.update(datos);

        res.status(200).json({
            mensaje: "Materia actualizada correctamente",
            datos: materia
        });

    } catch (error) {
        console.error("Error al actualizar materia:", error);

        res.status(500).json({
            mensaje: "Error al actualizar materia",
            error: error.message
        });
    }
};

const eliminarMateria = async (req, res) => {
    try {
        const { id } = req.params;

        const materia = await Materia.findByPk(id);

        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            });
        }

        await materia.destroy();

        res.status(200).json({
            mensaje: "Materia eliminada correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar materia:", error);

        res.status(500).json({
            mensaje: "Error al eliminar materia",
            error: error.message
        });
    }
};

export {
    crearMateria,
    obtenerMaterias,
    actualizarMateria,
    eliminarMateria
};