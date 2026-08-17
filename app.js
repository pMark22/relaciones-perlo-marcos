import express from "express";
import sequelize from "./src/config/database.js";
import User from "./src/models/user.model.js";
import Task from "./src/models/task.model.js";
import Materia from "./src/models/materia.model.js";
import MateriaTarea from "./src/models/materiaTarea.model.js";
import Preferencias from "./src/models/preferencias.model.js";
import preferenciasRoutes from "./src/routes/preferencias.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import materiaRoutes from "./src/routes/materia.routes.js";
import materiaTareaRoutes from "./src/routes/materiaTarea.routes.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Funcionando Correctamente");
});

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/materia-tareas", materiaTareaRoutes);
app.use("/api/preferencias", preferenciasRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión correcta a la base de datos");

        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados correctamente");

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
};

startServer();