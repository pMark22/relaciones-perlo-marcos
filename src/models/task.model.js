import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";
import User  from "./user.model.js";

const Task = sequelize.define("Task", {
    id:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isComplete:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
},
},{
    timestamps: true,
    paranoid: true,
});

export default Task;

//relaciones
//relacion de uno a muchos
Task.belongsTo(User, {
    foreignKey: "userId",
    as:"author"
});

User.hasMany(Task,{
    foreignKey:"userId",
    as: "tareas"
})