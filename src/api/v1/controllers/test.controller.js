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
                address: reqBody.address,
                blood_group: reqBody.blood_group,
                test_type: reqBody.test_type,
                time: reqBody.time,
                schedule_date: reqBody.schedule_date,
            };
            // check for validation
            const validationResult = Validator.validate(testToBeCreated, {
                user_id: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true },
                },
                lab_id: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true },
                },
                full_name: { presence: { allowEmpty: false } },
                age: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true },
                },
                mobile_number: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true },
                    length: { minimum: 10 },
                },
                address: { presence: { allowEmpty: false } },
                test_type: { presence: { allowEmpty: false } },
                blood_group: { presence: { allowEmpty: false } },
                time: { presence: { allowEmpty: false } },
                schedule_date: { presence: { allowEmpty: false } },
            });
            if (validationResult) {
                throw new ApiError.ValidationError(
                    MessageConstants.VALIDATION_ERROR,
                    validationResult
                );
            }

            // console.log('testToBeCreated', testToBeCreated)
            const test = await TestService.createNewTest(testToBeCreated);
            return res
                .status(StatusCodesConstants.SUCCESS)
                .json(
                    Response.sendSuccess(
                        MessageConstants.TEST_ADD_SUCCESSFULLY,
                        test,
                        StatusCodesConstants.SUCCESS
                    )
                );
        } catch ({
            message,
            code = StatusCodesConstants.INTERNAL_SERVER_ERROR,
            error = {},
        }) {
            Chalk.error(message, { message, code, error });
            return res.status(code).json(Response.sendError(message, error, code));
        }
    },

    /**
    * Get Test By Id
    */
    getTestById: async (req, res) => {
        try {
            const testId = req.params.id;
            let test = await TestService.checkIfTestExistsWithId(testId);
            test = test ? test.get({ plain: true }) : null;
            if (!test) {
                throw new ApiError.ValidationError(MessageConstants.TEST_NOT_PRESENT);
            };
            let tests = await TestService.getTestById(testId);
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.TEST_FETCHED_SUCCESSFULLY,
                tests,
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
    * Get List of Tests By User Id
    */
    getAllTestOfUser: async (req, res) => {
        try {
            const reqBody = req.body;
            let filters = {
                // keyword: (reqBody.keyword || '').trim(),
                user_id: req.params.id,
                limit: Number(reqBody.per_page) || QueryConstants.LIMIT,
                page: Number(reqBody.page) || QueryConstants.CURRENT_PAGE,
                offset: Number(reqBody.offset) || QueryConstants.OFFSET,
                sortBy: reqBody.sortBy || QueryConstants.TEST_SORT_BY[0],
                sortType: reqBody.sortType || QueryConstants.TEST_SORT_TYPES[0]
            };
            filters.offset = (filters.page - 1) * filters.limit;
            let data = { pages: 0, total_count: 0, records: [] };
            console.log('filters', filters)
            const tests = await TestService.getAllTestOfUser(filters);
            data['pages'] = Math.ceil(tests.count / filters.limit);
            data['total_count'] = tests.count;
            data['records'] = tests.rows;
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.TEST_FETCHED_SUCCESSFULLY,
                data,
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
    * Delete Test By Id
    */
    deleteTestById: async (req, res) => {
        try {
            const testId = req.params.id;
            let test = await TestService.checkIfTestExistsWithId(testId);
            test = test ? test.get({ plain: true }) : null;
            if (!test) {
                throw new ApiError.ValidationError(MessageConstants.TEST_NOT_PRESENT);
            };
            await TestService.deleteTestById(testId);
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.TEST_DELETED,
                {},
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

};
