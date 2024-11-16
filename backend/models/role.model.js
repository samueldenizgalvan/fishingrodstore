module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
    }, {
        timestamps: true,
        tableName: 'roles'
    });

    return Role;
};
