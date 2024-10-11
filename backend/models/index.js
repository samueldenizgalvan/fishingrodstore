const dbConfig = require("./../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.assistedKnives = require("./assisted-knife.model.js")(sequelize, Sequelize);
db.automaticKnives = require("./automatic-knife.model.js")(sequelize, Sequelize);
db.fixedBladeKnives = require("./fixed-blade-knife.model.js")(sequelize, Sequelize);

module.exports = db;
