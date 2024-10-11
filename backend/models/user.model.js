module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        identification: {
            type: Sequelize.STRING(20), // Longitud máxima basada en tu tabla MySQL
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true, // No permitir que esté vacío
                len: [5, 20]    // Longitud mínima y máxima
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
            unique: true, // Asegura que el email sea único
            validate: {
                isEmail: true,  // Verificar que sea un email válido
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
                len: [8, 200]  // Asegurar una longitud mínima de 8 caracteres para la contraseña
            }
        }
    }, {
        tableName: 'users'
    });

    return User;
};
