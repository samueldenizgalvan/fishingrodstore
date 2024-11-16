const db = require("../models");
const Product = db.products;

exports.create = async (req, res) => {
    console.log("Request Body:", req.body); // Verifica los datos recibidos

    try {
        const { price, code, brand, photo_url, color, category } = req.body;

        // Verificar que los campos requeridos no estén vacíos
        if (!price || !code || !brand || !category) {
            return res.status(400).send({ message: "Required fields are required." });
        }

        // Crear el producto
        const product = await Product.create({
            price,
            code,
            brand,
            photo_url: photo_url || null,
            color: color || null,
            category
        });

        res.status(201).send({ message: "Product created successfully.", product });

    } catch (error) {
        console.error("Error creating product:", error); // Ver detalles del error
        res.status(500).send({ message: error.message || "Error creating product." });
    }
};


// Obtener todos los productos
exports.findAll = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving products." });
    }
};

// Obtener un producto por ID
exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving product." });
    }
};

// Filtrar productos por categoría
exports.findByCategory = async (req, res) => {
    try {
        const { category } = req.params; // Obtener la categoría de los parámetros

        const products = await Product.findAll({
            where: { category }
        });

        if (products.length === 0) {
            return res.status(404).send({ message: "No products found in this category." });
        }

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving products by category." });
    }
};

// Actualizar un producto
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }

        // Actualizar datos del producto
        await product.update(req.body);

        res.status(200).send({ message: "Product updated successfully." });

    } catch (error) {
        res.status(500).send({ message: "Error updating product." });
    }
};

// Eliminar un producto
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }

        await product.destroy();
        res.status(200).send({ message: "Product successfully deleted." });

    } catch (error) {
        res.status(500).send({ message: "Error deleting product." });
    }
};

// Eliminar todos los productos
exports.deleteAll = async (req, res) => {
    try {
        const deletedCount = await Product.destroy({
            where: {},
            truncate: true // Esto eliminará todos los registros de la tabla
        });

        res.status(200).send({ message: `${deletedCount} products successfully deleted.` });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error deleting products." });
    }
};
