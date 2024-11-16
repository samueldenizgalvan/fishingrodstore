const Role = require('../models/role.model');

// Crear un rol (por ejemplo, "admin", "user")
exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).send({ message: "The role name is required." });
        }

        const [role, created] = await Role.findOrCreate({
            where: { name },
            defaults: { description: description || "" }
        });

        if (created) {
            res.status(201).send({ message: "Successfully created role.", role });
        } else {
            res.status(200).send({ message: "The role already existed.", role });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error creating role." });
    }
};

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).send(roles);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error getting roles." });
    }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).send({ message: "Role not found." });
        }

        res.status(200).send(role);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error getting role." });
    }
};

// Actualizar un rol por ID
exports.updateRole = async (req, res) => {
    try {
        const { name, description } = req.body;
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).send({ message: "Role not found." });
        }

        role.name = name || role.name;
        role.description = description || role.description;
        await role.save();

        res.status(200).send({ message: "Role updated successfully.", role });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error updating role." });
    }
};

// Eliminar un rol por ID
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).send({ message: "Role not found." });
        }

        await role.destroy();
        res.status(200).send({ message: "Role successfully deleted." });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error deleting role." });
    }
};
