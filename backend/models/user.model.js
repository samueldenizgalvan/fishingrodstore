module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        identification: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [5, 20]
            }
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        surname1: {
            type: Sequelize.STRING(40),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        surname2: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: true 
        },
        address: {
            type: Sequelize.STRING(150),
            allowNull: true 
        },
        password: {
            type: Sequelize.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 200]
            }
        },
        sexo: {
            type: Sequelize.STRING(8),
            allowNull: true
        },
        // Nuevo campo creado para alojar el nombre de nuestra imagen //2
        filename: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true,  // Añade createdAt y updatedAt automáticamente
        tableName: 'users'
    });

    return User;
};
