const Sequelize = require('sequelize');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const {
    User,
    sequelize
} = require('../../../../models');
const {
    StatusesConstants,
    MessageConstants,
    RolesConstants
} = require('../../../constants');
const {
    Validator,
    ApiError,
    Chalk,
    Response
} = require('../../../../utils');

const { Op } = Sequelize;

const UserService = {

    /**
     * Find the user by the email or the phone number
     * if user id is also provided ignores that particular user
     */
    findUserByEmailOrPhone: async (
        { email, mobile_number },
        userId = null, extraFilters = {}
    ) => {
        if (!email && !mobile_number) {
            return null;
        }
        return User.findOne({
            where: {
                [Op.or]: [
                    { ...(email && { email }) },
                    { ...(mobile_number && { mobile_number }) }
                ],
                ...(userId && {
                    id: {
                        [Op.ne]: userId
                    }
                }),
                ...extraFilters
            },
            paranoid: false,
            attributes: { exclude: ['deleted_at'] }
        });
    },

    /**
    * Check whether the user exits by id
    */
    checkIfUserExistsWithId: (id) => User.findOne({
        where: { id }, attributes: { exclude: ['deleted_at'] }
    }),

    /**
    * Create New User
    */
    createNewUser: async (userToBeCreated) => {
        const transaction = await sequelize.transaction();
        try {
            const createdUser = await User.create(userToBeCreated, {
                ...(transaction && { transaction })
            });

            transaction.commit();
            return {
                id: createdUser.id,
                full_name: createdUser.full_name,
                email: createdUser.email,
                mobile_number: createdUser.mobile_number,
                created_at: createdUser.created_at,
                updated_at: createdUser.updated_at
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            };
            throw new Error((error && error.message) || MessageConstants.INTERNAL_SERVER_ERROR);
        }
    },

    /**
    * Get User By Id
    */
    getUserById: (userId) => User.findOne({
        where: { id: userId },
        attributes: { exclude: ['id', 'created_at', 'updated_at', 'deleted_at'] }
    }),

    /**
    * Update user by id
    */
    updateUserDetailById: async (userId, userToBeUpdated) => {
        const transaction = await sequelize.transaction();
        try {
            await User.update(userToBeUpdated, {
                where: { id: userId },
                ...(transaction && { transaction })
            });

            transaction.commit();
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw new Error((error && error.message) || MessageConstants.INTERNAL_SERVER_ERROR);
        }
    },



    /**
    * Delete User By Id
    */
    deleteUserById: async (userId) => {
        const transaction = await sequelize.transaction();
        try {
            await User.destroy({ where: { id: userId }, transaction });
            transaction.commit();
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            };
            throw new Error((error && error.message) || MessageConstants.INTERNAL_SERVER_ERROR);
        }
    },

};

module.exports = UserService;
