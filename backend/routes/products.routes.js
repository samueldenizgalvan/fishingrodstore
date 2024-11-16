module.exports = app => {
    const products = require("../controllers/product.controller.js");

    var router = require("express").Router();

    // Crear un nuevo producto
    router.post("/", products.create);

    // Obtener todos los productos
    router.get("/", products.findAll);

    // Obtener un producto por id
    router.get("/:id", products.findOne);

    // Filtrar productos por categoría
    router.get("/category/:category", products.findByCategory);

    // Actualizar un producto por id
    router.put("/:id", products.update);

    // Eliminar un producto por id
    router.delete("/:id", products.delete);

    // Eliminar todos los productos
    router.delete("/", products.deleteAll);

    // Usa la ruta en la aplicación
    app.use("/api/products", router);
};