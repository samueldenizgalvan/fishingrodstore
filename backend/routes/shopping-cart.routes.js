module.exports = app => {
    const shoppingCart = require("../controllers/shopping-cart.controller");
    const router = require("express").Router();

    // Agregar un producto al carrito
    router.post("/", shoppingCart.addToCart);

    // Obtener el carrito de compras de un usuario
    router.get("/:user_id", shoppingCart.getCartByUser);

    // Vaciar el carrito de compras de un usuario (mover esta ruta antes de removeFromCart)
    router.delete("/clear/:user_id", shoppingCart.clearCart);

    // Eliminar un producto del carrito
    router.delete("/:user_id/:product_id", shoppingCart.removeFromCart);

    // Usa la ruta en la aplicación
    app.use("/api/cart", router);
};