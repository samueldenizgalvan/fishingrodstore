require('dotenv').config(); // Carga las variables del archivo .env
//npm install dotenv (recordar instalar)

module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: { // Opcional: configuraciones adicionales para Sequelize
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    },
    production: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 10, // Valores mayores para entornos de producción
            min: 2,
            acquire: 30000,
            idle: 10000
        }
    }
};
