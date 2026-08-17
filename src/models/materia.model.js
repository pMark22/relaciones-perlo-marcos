import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Task from "./task.model.js";
import MateriaTarea from "./materiaTarea.model.js";

const Materia = sequelize.define("Materia", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Relaciones
// Relación de muchos a muchos

Materia.belongsToMany(Task, {
    through: MateriaTarea,
    foreignKey: "materiaId",
    otherKey: "tareaId",
    as: "tareas"
});

Task.belongsToMany(Materia, {
    through: MateriaTarea,
    foreignKey: "tareaId",
    otherKey: "materiaId",
    as: "materias"
});

export default Materia;