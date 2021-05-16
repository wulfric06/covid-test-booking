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
    * Get Test By Id
    */

    /**
    * Update Test by id
    */

    /**
    * Delete Test By Id
    */

};

module.exports = TestService;
