const bcrypt = require('bcryptjs');
const {
    UserService,
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
    * Create New Users
    */
    createNewUser: async (req, res) => {
        try {
            const reqBody = req.body;
            const userToBeCreated = {
                full_name: reqBody.full_name,
                email: reqBody.email,
                password: reqBody.password,
                mobile_number: reqBody.mobile_number
            };
            // check for validation
            const validationResult = Validator.validate(userToBeCreated, {
                full_name: { presence: { allowEmpty: false } },
                email: { presence: { allowEmpty: false }, email: true },
                password: { presence: { allowEmpty: false }, length: { minimum: 6 } },
                mobile_number: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true },
                    length: { minimum: 10 }
                }
            });
            if (validationResult) {
                throw new ApiError.ValidationError(MessageConstants.VALIDATION_ERROR, validationResult);
            };

            // return if the email is already registered
            if (await UserService.findUserByEmailOrPhone({ email: userToBeCreated.email })) {
                throw new ApiError.ValidationError(MessageConstants.EMAIL_ALREADY_REGISTERED);
            };

            userToBeCreated.password = await bcrypt.hash(userToBeCreated.password, 10);
            // console.log('userToBeCreated', userToBeCreated)
            const user = await UserService.createNewUser(userToBeCreated);
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.USER_ADD_SUCCESSFULLY,
                user,
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
    * Get User By Id
    */
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            let user = await UserService.checkIfUserExistsWithId(userId);
            user = user ? user.get({ plain: true }) : null;
            if (!user) {
                throw new ApiError.ValidationError(MessageConstants.USER_NOT_PRESENT);
            };
            let users = await UserService.getUserById(userId);
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.USER_FETCHED_SUCCESSFULLY,
                users,
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
    * Update User By Id
    */
    updateUserDetailById: async (req, res) => {
        try {
            const userId = req.params.id;
            let user = await UserService.checkIfUserExistsWithId(userId);
            user = user ? user.get({ plain: true }) : null;
            if (!user) {
                throw new ApiError.ValidationError(MessageConstants.USER_NOT_PRESENT);
            };
            const reqBody = req.body;
            const userToBeUpdated = {
                full_name: reqBody.full_name,
                email: reqBody.email,
                password: reqBody.password,
                mobile_number: reqBody.mobile_number
            };
            // check for validation
            const validationResult = Validator.validate(userToBeUpdated, {
                full_name: { presence: { allowEmpty: false } },
                email: { presence: { allowEmpty: false }, email: true },
                password: { presence: { allowEmpty: false }, length: { minimum: 6 } },
                mobile_number: {
                    presence: { allowEmpty: false },
                    numericality: { onlyInteger: true },
                    length: { minimum: 10 }
                }
            });
            if (validationResult) {
                throw new ApiError.ValidationError(MessageConstants.VALIDATION_ERROR, validationResult);
            };

            // return if the email is already registered
            if (await UserService.findUserByEmailOrPhone({ email: userToBeUpdated.email }, userId)) {
                throw new ApiError.ValidationError(MessageConstants.EMAIL_ALREADY_REGISTERED);
            }

            if (userToBeUpdated.password) {
                userToBeUpdated.password = await bcrypt.hash(userToBeUpdated.password, 10);
            } else {
                delete userToBeUpdated.password;
            }
            // console.log('userToBeUpdated', userToBeUpdated)
            await UserService.updateUserDetailById(userId, userToBeUpdated);
            return res.status(StatusCodesConstants.SUCCESS)
                .json(Response.sendSuccess(MessageConstants.USER_UPDATE_SUCCESSFULLY));
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
    * Delete User By Id
    */
    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            let user = await UserService.checkIfUserExistsWithId(userId);
            user = user ? user.get({ plain: true }) : null;
            if (!user) {
                throw new ApiError.ValidationError(MessageConstants.USER_NOT_PRESENT);
            };
            await UserService.deleteUserById(userId);
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.USER_DELETED,
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
