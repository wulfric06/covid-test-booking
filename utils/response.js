const { StatusCodesConstants } = require('../src/constants');

const response = {
  success: false,
  message: '',
  data: {},
  responseCode: 200
};

module.exports = {
  /**
   *
   * @param {integer} responseCode Response code
   * @param {string} message Message of the response
   * @param {object} data Data of the response
   */
  sendError(message = '', data = {}, responseCode = StatusCodesConstants.BAD_REQUEST) {
    return {
      ...response,
      responseCode,
      message,
      data
    };
  },
  /**
   *
   * @param {integer} responseCode Response code
   * @param {string} message Message of the response
   * @param {object} data Data of the response
   */
  sendSuccess(message = '', data = {}, responseCode = StatusCodesConstants.SUCCESS) {
    return {
      ...response,
      responseCode,
      message,
      data,
      success: true
    };
  }
};
