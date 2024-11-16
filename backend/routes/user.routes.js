module.exports = app => {
    const users = require("./../controllers/user.controller");
    const auth = require("./../middlewares/auth"); // Importar el middleware de autenticación/autorización
    let upload = require('../middlewares/upload'); //4 Esto es para el multer que lo guarde en la carpeta middlewares
    let router = require("express").Router();
  
    // Rutas públicas
    router.post("/register", users.create); // Ruta para registrar usuario
    router.post("/login", users.login); // Ruta para hacer login
    router.get("/:id", [auth.authenticateToken], users.findOne); // Obtener un usuario por ID (publico para mostrar los datos del usuario cuando inicie sesión)
    router.post("/update-photo", [auth.authenticateToken, upload.single('file')], users.updatePhoto); // Crea el metodo para este end point
    
    // Rutas protegidas (solo el admin puede acceder)
    router.get("/", [auth.authenticateToken, auth.isAdmin], users.findAll); // Obtener todos los usuarios (admin)
    router.put("/:id", [auth.authenticateToken, auth.isAdmin], users.update); // Actualizar un usuario (admin)
    router.delete("/:id", [auth.authenticateToken, auth.isAdmin], users.delete); // Eliminar un usuario (admin)
    router.delete("/", [auth.authenticateToken, auth.isAdmin], users.deleteAll); // Eliminar todos los usuarios (admin)

    app.use('/api/users', router); // Prefijo para las rutas
};
