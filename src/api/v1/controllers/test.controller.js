const bcrypt = require('bcryptjs');
const {
    TestService,
} = require('../services');
const {
    StatusCodesConstants,
    StatusesConstants,
    MessageConstants,
    QueryConstants,
    ParamsConstants,
    AccessConstants
} = require('../../../constants');
const {
    Response,
    Chalk,
    ApiError,
    Validator
} = require('../../../../utils');

module.exports = {

    /**
    * Create New Test
    */
    createNewTest: async (req, res) => {
        try {
            const reqBody = req.body;
            const testToBeCreated = {
                user_id: reqBody.user_id,
                lab_id: reqBody.lab_id,
                full_name: reqBody.full_name,
                age: reqBody.age,
                mobile_number: reqBody.mobile_number,
                blood_group: reqBody.blood_group,
                test_type: reqBody.test_type,
                time: reqBody.time,
                schedule_date: reqBody.schedule_date,
                image: reqBody.image || null
            };
            // check for validation
            const validationResult = Validator.validate(testToBeCreated, {
                user_id: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true }
                },
                lab_id: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true }
                },
                full_name: { presence: { allowEmpty: false } },
                age: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true }
                },
                mobile_number: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true },
                    length: { minimum: 10 }
                },
                test_type: { presence: { allowEmpty: false } },
                blood_group: { presence: { allowEmpty: false } },
                time: { presence: { allowEmpty: false } },
                schedule_date: { presence: { allowEmpty: false } }
            });
            if (validationResult) {
                throw new ApiError.ValidationError(MessageConstants.VALIDATION_ERROR, validationResult);
            };

            // Get prescription picture name
            testToBeCreated.image = '/public/uploads/prescription/' + req.file.filename;

            // console.log('testToBeCreated', testToBeCreated)
            const test = await TestService.createNewTest(testToBeCreated);
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.TEST_ADD_SUCCESSFULLY,
                test,
                StatusCodesConstants.SUCCESS
            ));
        } catch ({ message, code = StatusCodesConstants.INTERNAL_SERVER_ERROR, error = {} }) {
            Chalk.error(message, { message, code, error });
            return res.status(code).json(Response.sendError(
                message,
                error,
                code
            ));
        }
    },

    /**
    * Get Test By Id
    */

    /**
    * Update Test By Id
    */

    /**
    * Delete Test By Id
    */

};
