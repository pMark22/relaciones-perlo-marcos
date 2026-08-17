import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const MateriaTarea = sequelize.define("MateriaTarea", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    materiaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tareaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "MateriaTarea",
});

export default MateriaTarea;