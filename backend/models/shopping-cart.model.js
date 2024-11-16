module.exports = (sequelize, Sequelize) => {
    const ShoppingCart = sequelize.define("shopping_cart", {
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        timestamps: true,
        tableName: 'shopping_cart',
        createdAt: 'createdAt',
        updatedAt: false
    });

    return ShoppingCart;
};
