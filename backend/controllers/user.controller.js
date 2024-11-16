const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const Role = db.roles;
const UserRoles = db.user_roles;

// Clave secreta cargada desde el entorno
const secretKey = process.env.JWT_SECRET;

// Crear un usuario (registro normal de usuario o administrador)
exports.create = async (req, res) => {
    try {
        const { identification, name, surname1, email, password, isAdmin } = req.body;

        // Verificar que los campos requeridos no estén vacíos
        if (!identification || !name || !surname1 || !email || !password) {
            return res.status(400).send({ message: "Required fields are required." });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario con la contraseña cifrada
        const user = await User.create({
            identification,
            name,
            surname1,
            surname2: req.body.surname2 || null,
            email,
            phone: req.body.phone || null,
            address: req.body.address || null,
            password: hashedPassword,
            sexo: req.body.sexo,
            filename: req.file ? req.file.filename : "" //5
        });

        // Asignar el rol correspondiente (admin o user)
        const userRole = isAdmin ? 
            await Role.findOne({ where: { name: "admin" } }) : 
            await Role.findOne({ where: { name: "user" } });

        if (userRole) {
            await UserRoles.create({
                user_id: user.id,
                role_id: userRole.id
            });
        }

        res.status(201).send({ message: "User created successfully." });

    } catch (error) {
        res.status(500).send({ message: error.message || "Error creating user." });
    }
};


// Autenticar usuario (login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const user = await User.findOne({ where: { email }, include: ["roles"] });
        if (!user) {
            console.log("User not found:", email);
            return res.status(404).send({ message: "User not found." });
        }

        // Verificar la contraseña
        const passwordIsValid = await bcrypt.compare(password, user.password);
        console.log("Valid password:", passwordIsValid); // Depuración
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid password." });
        }

        // Crear un token JWT válido por 24 horas
        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).send({
            userId: user.id,
            email: user.email,
            roles: user.roles.map(role => role.name),
            accessToken: token
        });

    } catch (error) {
        console.error("Login error:", error); // Mensaje de error
        res.status(500).send({ message: "Failed to log in." });
    }
};

// Obtener todos los usuarios (solo admin)
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({ include: ["roles"] });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: "Error recovering users." });
    }
};

// Obtener un usuario por ID (solo admin)
exports.findOne = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
        const user = await User.findByPk(id, { include: ["roles"] }); // Incluir roles en la búsqueda

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        res.status(200).send(user); // Retornar el usuario encontrado
    } catch (error) {
        res.status(500).send({ message: error.message || "Error getting user." });
    }
};

// Actualizar un usuario (solo admin)
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Actualizar datos del usuario (puedes agregar validaciones si es necesario)
        await user.update(req.body);

        res.status(200).send({ message: "User updated successfully." });

    } catch (error) {
        res.status(500).send({ message: "Error updating user." });
    }
};

// Eliminar un usuario (solo admin)
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        // Eliminar primero las asociaciones de roles con el usuario
        await db.user_roles.destroy({
            where: { user_id: id }
        });

        // Luego eliminar el usuario
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Eliminar el usuario
        await user.destroy();
        res.status(200).send({ message: "User successfully deleted." });
    } catch (err) {
        console.error("Error deleting user:", err); // Ver los detalles del error en el servidor
        res.status(500).send({
            message: "Error deleting user with id=" + id + ". Error: " + err.message
        });
    }
};

// Eliminar todos los usuarios (solo admin)
exports.deleteAll = async (req, res) => {
    try {
        const deletedCount = await User.destroy({
            where: {},
            truncate: true // Esto eliminará todos los registros de la tabla
        });

        res.status(200).send({ message: `${deletedCount} Users successfully deleted.` });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error deleting users." });
    }
};

// Actualizar la foto de perfil del usuario
exports.updatePhoto = async (req, res) => {
    try {
        // Obtiene el ID del usuario a través del token decodificado
        const userId = req.userId;

        // Verifica si el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Verifica si se cargó un archivo
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded." });
        }

        // Actualiza el campo `filename` del usuario con el nombre del archivo subido
        await user.update({ filename: req.file.filename });

        res.status(200).send({
            message: "Profile photo updated successfully.",
            filename: req.file.filename // Retorna el nombre del archivo actualizado
        });
    } catch (error) {
        res.status(500).send({ message: "Error updating profile photo." });
    }
};