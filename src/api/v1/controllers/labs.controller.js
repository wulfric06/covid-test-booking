const bcrypt = require('bcryptjs');
const {
    LabService,
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
    * Get All Labs
    */
    getAllLabs: async (req, res) => {
        try {
            const reqBody = req.body;
            let filters = {
                keyword: (reqBody.keyword || '').trim(),
                limit: Number(reqBody.per_page) || QueryConstants.LIMIT,
                page: Number(reqBody.page) || QueryConstants.CURRENT_PAGE,
                offset: Number(reqBody.offset) || QueryConstants.OFFSET,
                sortBy: reqBody.sortBy || QueryConstants.LAB_SORT_BY[0],
                sortType: reqBody.sortType || QueryConstants.LAB_SORT_TYPES[0]
            };
            filters.offset = (filters.page - 1) * filters.limit;
            let data = { pages: 0, total_count: 0, records: [] };
            console.log('filters', filters)
            const labs = await LabService.getAllLabs(filters);
            data['pages'] = Math.ceil(labs.count / filters.limit);
            data['total_count'] = labs.count;
            data['records'] = labs.rows;
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.LAB_FETCHED_SUCCESSFULLY,
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
    * Create New Lab
    */

    /**
    * Get Lab By Id
    */

    /**
    * Update Lab by id
    */

    /**
    * Delete Lab By Id
    */

    /**
     * Get Booking Details By Lab Id
     */
    getBookingDetailsForLab: async (req, res) => {
        try {
            const reqBody = req.body;
            let filters = {
                // keyword: (reqBody.keyword || '').trim(),
                lab_id: req.params.id,
                limit: Number(reqBody.per_page) || QueryConstants.LIMIT,
                page: Number(reqBody.page) || QueryConstants.CURRENT_PAGE,
                offset: Number(reqBody.offset) || QueryConstants.OFFSET,
                sortBy: reqBody.sortBy || QueryConstants.TEST_SORT_BY[0],
                sortType: reqBody.sortType || QueryConstants.TEST_SORT_TYPES[0]
            };
            filters.offset = (filters.page - 1) * filters.limit;
            let data = { pages: 0, total_count: 0, records: [] };
            console.log('filters', filters)
            const bookings = await LabService.getBookingDetailsForLab(filters);
            data['pages'] = Math.ceil(bookings.count / filters.limit);
            data['total_count'] = bookings.count;
            data['records'] = bookings.rows;
            return res.status(StatusCodesConstants.SUCCESS).json(Response.sendSuccess(
                MessageConstants.LAB_BOOKING_FETCHED_SUCCESSFULLY,
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

};
