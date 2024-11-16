const dbConfig = require("./../config/db.config.js");
const Sequelize = require("sequelize");

// Selección del entorno de ejecución (development, test, production)
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];


// Configuración de Sequelize usando los parámetros definidos en el entorno
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.user_roles = require("./user-role.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.shopping_cart = require("./shopping-cart.model.js")(sequelize, Sequelize);

// Definir las relaciones
db.users.belongsToMany(db.roles, {
    through: db.user_roles,
    foreignKey: 'user_id'
});
db.roles.belongsToMany(db.users, {
    through: db.user_roles,
    foreignKey: 'role_id'
});
db.users.belongsToMany(db.products, {
    through: db.shopping_cart,
    foreignKey: 'user_id'
});
db.products.belongsToMany(db.users, {
    through: db.shopping_cart,
    foreignKey: 'product_id'
});
db.shopping_cart.belongsTo(db.products, { foreignKey: 'product_id' });
db.shopping_cart.belongsTo(db.users, { foreignKey: 'user_id' });

// Crear el rol de administrador si no existe
async function createAdminRole() {
    try {
        const [adminRole] = await db.roles.findOrCreate({
            where: { name: "admin" },
            defaults: { description: "Administrator Role" }
        });
        console.log('Administrator role created or already exists:', adminRole.name);
    } catch (error) {
        console.error("Error creating administrator role:", error);
    }
}

// Exportar la conexión y la función
db.createAdminRole = createAdminRole;

module.exports = db;
