import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import { Op } from "sequelize";

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll({
            attributes: ["id", "name", "email"],
            include: {
                model: Task,
                as: "tareas",
                attributes: ["id", "title", "description", "isComplete"]
            }
        });

        res.status(200).json({
            mensaje: "Usuarios obtenidos correctamente",
            datos: usuarios
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);

        res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (name.length > 100 || email.length > 100 || password.length > 100) {
            return res.status(400).json({
                mensaje: "Los campos no pueden tener más de 100 caracteres"
            });
        }

        const usuarioExistente = await User.findOne({
            where: { email }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: "El email ya está registrado"
            });
        }

        const nuevoUsuario = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            datos: nuevoUsuario
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);

        res.status(500).json({
            mensaje: "Error al crear usuario",
            error: error.message
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (name.length > 100 || email.length > 100 || password.length > 100) {
            return res.status(400).json({
                mensaje: "Los campos no pueden tener más de 100 caracteres"
            });
        }

        const usuarioExistente = await User.findOne({
            where: {
                email,
                id: { [Op.ne]: id }
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: "El email ya está registrado por otro usuario"
            });
        }

        await usuario.update({
            name,
            email,
            password
        });

        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            datos: usuario
        });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);

        res.status(500).json({
            mensaje: "Error al actualizar usuario",
            error: error.message
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        await usuario.destroy();

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);

        res.status(500).json({
            mensaje: "Error al eliminar usuario",
            error: error.message
        });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await User.findByPk(id, {
            attributes: ["id", "name", "email"],
            include: {
                model: Task,
                as: "tareas",
                attributes: ["id", "title", "description", "isComplete"]
            }
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Usuario obtenido correctamente",
            datos: usuario
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);

        res.status(500).json({
            mensaje: "Error al obtener usuario",
            error: error.message
        });
    }
};

export {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};