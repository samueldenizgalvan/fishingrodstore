module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        code: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        brand: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo_url: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        color: {
            type: Sequelize.STRING(20),
            allowNull: true
        },
        category: {
            type: Sequelize.ENUM('Automatic Knife', 'Assisted Knife', 'Fixed Blade Knife'),
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'products'
    });

    return Product;
};
