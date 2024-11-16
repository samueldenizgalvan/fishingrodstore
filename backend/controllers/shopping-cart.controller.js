const db = require("../models");
const ShoppingCart = db.shopping_cart;
const Product = db.products;
const User = db.users;

// Agregar producto al carrito
exports.addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        // Verificar si el producto ya está en el carrito
        let cartItem = await ShoppingCart.findOne({
            where: { user_id, product_id }
        });

        if (cartItem) {
            // Si ya está en el carrito, actualizamos la cantidad
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Si no está, lo agregamos
            cartItem = await ShoppingCart.create({
                user_id,
                product_id,
                quantity
            });
        }

        res.status(200).send({ message: "Product added to cart successfully.", cartItem });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error adding product to cart." });
    }
};

// Obtener el carrito de compras de un usuario con detalles de productos
exports.getCartByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Realizamos una consulta con JOIN para obtener detalles de productos
        const cart = await ShoppingCart.findAll({
            where: { user_id },
            include: [{
                model: Product,
                attributes: ['id', 'code', 'brand', 'price', 'photo_url'] // Campos a mostrar del producto
            }]
        });

        if (!cart.length) {
            return res.status(404).send({ message: "No products found in the shopping cart." });
        }

        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving shopping cart." });
    }
};

// Eliminar un producto del carrito
exports.removeFromCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.params;

        const cartItem = await ShoppingCart.findOne({
            where: { user_id, product_id }
        });

        if (!cartItem) {
            return res.status(404).send({ message: "Product not found in the cart." });
        }

        await cartItem.destroy();
        res.status(200).send({ message: "Product removed from cart successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error removing product from cart." });
    }
};

// Método para limpiar el carrito (No funciona!)
exports.clearCart = async (req, res) => {
    const { user_id } = req.params; // Esto debería obtener el ID correctamente

    try {
        // Obtén todos los elementos del carrito del usuario
        const cartItems = await ShoppingCart.findAll({ where: { user_id } });

        // Si el carrito ya está vacío
        if (cartItems.length === 0) {
            return res.status(200).send({ message: "Shopping cart is already empty." });
        }

        // Elimina todos los elementos del carrito
        await ShoppingCart.destroy({ where: { user_id } });

        res.status(200).send({ message: "Shopping cart cleared successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error clearing shopping cart." });
    }
};
