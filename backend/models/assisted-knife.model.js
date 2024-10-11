module.exports = (sequelize, Sequelize) => {
    const AssistedKnife = sequelize.define("assisted_knives", {
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false
        },
        photo_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        color: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        tableName: 'fixed_blade_knives'
    });

    return AssistedKnife;
};
