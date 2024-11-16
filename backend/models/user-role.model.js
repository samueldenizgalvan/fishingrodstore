module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("user_roles", {
        user_id: {
            type: Sequelize.BIGINT,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        role_id: {
            type: Sequelize.BIGINT,
            references: {
                model: 'roles',
                key: 'id'
            }
        }
    }, {
        timestamps: true,
        tableName: 'user_roles'
    });

    return UserRole;
};
