const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

// Clave secreta cargada desde el entorno
const secretKey = process.env.JWT_SECRET; 

// Middleware de autenticación
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Remover el prefijo "Bearer"

    if (!token) {
        return res.status(401).send({ message: "Access Token Required!" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Invalid Token!" });
        }

        req.userId = decoded.id;
        next();
    });
};

// Middleware de autorización (solo admin)
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId, { include: ["roles"] });
        const roles = user.roles.map(role => role.name);

        if (roles.includes("admin")) {
            next(); // Si es admin, permitir continuar
        } else {
            return res.status(403).send({ message: "Require Admin Role!" });
        }
    } catch (err) {
        res.status(500).send({ message: "Unable to validate user role!" });
    }
};
