import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";

const Preferencias = sequelize.define("Preferencias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tema: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    idioma: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false,
});

Preferencias.belongsTo(User, {
    foreignKey: "userId",
    as: "usuario"
});

User.hasOne(Preferencias, {
    foreignKey: "userId",
    as: "preferencias"
});

export default Preferencias;