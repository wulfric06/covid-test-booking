const bcrypt = require('bcryptjs');
const {
    MessageConstants,
    StatusCodesConstants,
    StatusesConstants,
    QueryConstants,
    ParamsConstants,
    RolesConstants
} = require('../../../constants');
const {
    Validator, Response, ApiError, Chalk
} = require('../../../../utils');
const { UserService } = require('../services');
const { AuthHelper } = require('../helpers');

module.exports = {

    /**
     * Register new admin user
     */
    register: async (req, res) => {
        try {
            const { id: userId } = req.userInfo;

            const reqBody = req.body;
            const userToBeCreated = {
                full_name: reqBody.full_name,
                mobile_number: reqBody.mobile_number,
                email: reqBody.email,
                password: reqBody.password
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
            }

            userToBeCreated.password = await bcrypt.hash(userToBeCreated.password, 10);
            console.log('userToBeCreated', userToBeCreated)
            // const createdUser = await UserService.addNewUser(userToBeCreated);
            return res
                .status(StatusCodesConstants.SUCCESS)
                .json(Response.sendSuccess(
                    MessageConstants.USER_REGISTERED_SUCCESSFULLY,
                    {
                        user: {
                            id: createdUser.id,
                            first_name: createdUser.first_name,
                            last_name: createdUser.last_name,
                            email: createdUser.email,
                            mobile_number: createdUser.mobile_number
                        }
                    },
                    StatusCodesConstants.SUCCESS
                ));
        } catch ({ message, code, error = StatusCodesConstants.INTERNAL_SERVER_ERROR }) {
            Chalk.error(message, { message, code, error });
            return res.status(code).json(Response.sendError(
                message,
                error,
                code
            ));
        }
    },

    /**
     * Authenticate the user
     */
    login: async (req, res) => {
        try {
            const reqBody = req.body;
            const userToBeLogin = {
                email: reqBody.email,
                password: reqBody.password,
                role: reqBody.role,
                device_token: reqBody.device_token || null
            };

            const { email, role } = userToBeLogin;
            let foundUser = await UserService.findUserByEmailOrPhone({
                email: email
            });
            foundUser = foundUser.get({ plain: true });
            // console.log('founduser 1', foundUser)

            if (foundUser) {
                if (await bcrypt.compare(reqBody.password, foundUser.password)) {

                    const filters = {
                        userId: Number(foundUser.id)
                    };
                    let data = { id: foundUser.id, user: foundUser };
                    return res
                        .status(StatusCodesConstants.SUCCESS)
                        .json(Response.sendSuccess(
                            MessageConstants.USER_LOGGED_IN,
                            data,
                            StatusCodesConstants.SUCCESS
                        ));
                }
                throw new ApiError.ValidationError(MessageConstants.INVALID_PASSWORD);
            }
            throw new ApiError.ValidationError(MessageConstants.EMAIL_OR_PHONE_NOT_REGISTERED_YET);
        } catch ({ message, code, error = {} }) {
            Chalk.error(message, { message, code, error });
            return res.status(code).json(Response.sendError(
                message,
                error,
                code
            ));
        }
    },

    /**
     * Logout the user
     */
    logout: async (req, res) => {
        try {
            const { id: userId } = req.userInfo;
            await UserService.updateUserById(userId, { login_token: null });
            return res
                .status(StatusCodesConstants.SUCCESS)
                .json(Response.sendSuccess(
                    MessageConstants.USER_LOGGED_OUT,
                    {},
                    StatusCodesConstants.SUCCESS
                ));
        } catch ({ message, code, error = {} }) {
            Chalk.error(message, { message, code, error });
            return res.status(code).json(Response.sendError(
                message,
                error,
                code
            ));
        }
    },

};
