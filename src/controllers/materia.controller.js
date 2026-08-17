import Materia from "../models/materia.model.js";
import Task from "../models/task.model.js";

const crearMateria = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje: "El nombre de la materia es obligatorio"
            });
        }

        if (nombre.length > 100) {
            return res.status(400).json({
                mensaje: "El nombre no puede tener más de 100 caracteres"
            });
        }

        const materiaExistente = await Materia.findOne({
            where: { nombre }
        });

        if (materiaExistente) {
            return res.status(400).json({
                mensaje: "La materia ya existe"
            });
        }

        const nuevaMateria = await Materia.create({ nombre });

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

export {
    crearMateria,
    obtenerMaterias
};