module.exports = (sequelize, DataTypes) => {
    const Lab = sequelize.define('Lab', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        location: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        contact: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(20)
        },
        image: {
            allowNull: false,
            type: DataTypes.STRING
        },

    }, {
        tableName: 'labs',
        timestamps: false,
        // paranoid: true,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: 'deleted_at'
    });
    Lab.associate = (models) => { };
    return Lab;
};
