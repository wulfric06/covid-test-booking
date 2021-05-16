const Sequelize = require('sequelize');
const moment = require('moment');
const {
    Lab,
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

const LabService = {

    /**
    * Find the Lab by the email or the phone number
    * if Lab id is also provided ignores that particular user
    */

    /**
    * Check whether the Lab exits by id
    */

    /**
    * Get All Labs
    */
    getAllLabs: ({
        keyword, limit, offset, sortBy, sortType
    }) => {
        let orderBy = null;
        if (sortBy && sortType) {
            orderBy = {
                order: [
                    [sortBy, sortType]
                ]
            };
        };
        // add search criteria
        let searchCriteria = {};
        if (keyword) {
            searchCriteria = Sequelize.where(Sequelize.fn('trim', Sequelize.col('name')), {
                [Op.substring]: keyword
            });
        };
        // console.log('searchCriteria', searchCriteria)
        return Lab.findAndCountAll({
            where: {
                [Op.and]: [
                    searchCriteria
                ]
            },
            attributes: { exclude: [] },
            ...(!!orderBy && orderBy),
            offset,
            limit,
            distinct: true
        })
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

};

module.exports = LabService;
