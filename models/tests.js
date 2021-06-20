module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('Test', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER(11),
            references: {
                model: 'users',
                key: 'id'
            }
        },
        lab_id: {
            allowNull: false,
            type: DataTypes.INTEGER(11),
            references: {
                model: 'labs',
                key: 'id'
            }
        },
        full_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        age: {
            allowNull: false,
            type: DataTypes.INTEGER(3)
        },
        mobile_number: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(20)
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING
        },
        blood_group: {
            allowNull: false,
            type: DataTypes.STRING
        },
        test_type: {
            allowNull: false,
            type: DataTypes.STRING(20)
        },
        time: {
            allowNull: false,
            type: DataTypes.STRING(20)
        },
        schedule_date: {
            type: DataTypes.STRING(20)
        }
    }, {
        tableName: 'tests',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });
    Test.associate = (models) => { };
    return Test;
};
