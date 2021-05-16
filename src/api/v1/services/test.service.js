const Sequelize = require('sequelize');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const {
    Test,
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

const TestService = {

    /**
    * Create New Test
    */
    createNewTest: async (testToBeCreated) => {
        const transaction = await sequelize.transaction();
        try {
            const createdTest = await Test.create(testToBeCreated, {
                ...(transaction && { transaction })
            });

            transaction.commit();
            return {
                id: createdTest.id,
                user_id: createdTest.user_id,
                lab_id: createdTest.lab_id,
                full_name: createdTest.full_name,
                age: createdTest.age,
                mobile_number: createdTest.mobile_number,
                blood_group: createdTest.mobile_number,
                test_type: createdTest.test_type,
                time: createdTest.time,
                schedule_date: createdTest.schedule_date,
                image: createdTest.image,
                created_at: createdTest.created_at,
                updated_at: createdTest.updated_at
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            };
            throw new Error((error && error.message) || MessageConstants.INTERNAL_SERVER_ERROR);
        }
    },

    /**
    * Check whether the Test exits by id
    */
    checkIfTestExistsWithId: (id) => Test.findOne({
        where: { id }, attributes: { exclude: ['deleted_at'] }
    }),

    /**
    * Get Test By Id
    */
    getTestById: (testId) => Test.findOne({
        where: { id: testId },
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
    }),

    /**
    * Get List of Tests By User Id
    */
    getAllTestOfUser: ({
        // keyword,
        user_id, limit, offset, sortBy, sortType
    }) => {
        let orderBy = null;
        if (sortBy && sortType) {
            orderBy = {
                order: [
                    [sortBy, sortType]
                ]
            };
        };

        return Test.findAndCountAll({
            where: {
                // [Op.and]: [
                // ],
                ...(user_id && { user_id: user_id })
            },
            attributes: { exclude: [] },
            ...(!!orderBy && orderBy),
            offset,
            limit,
            distinct: true
        })
    },

    /**
    * Delete Test By Id
    */
    deleteTestById: async (testId) => {
        const transaction = await sequelize.transaction();
        try {
            await Test.destroy({ where: { id: testId }, transaction });
            transaction.commit();
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            };
            throw new Error((error && error.message) || MessageConstants.INTERNAL_SERVER_ERROR);
        }
    },

};

module.exports = TestService;
