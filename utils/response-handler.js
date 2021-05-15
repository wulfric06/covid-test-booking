
module.exports = {
  /**
   *
   * @param {integer} responseCode Response code
   * @param {string} message Message of the response
   * @param {object} data Data of the response
   */
  __success(res, data, message = 'Success', status = 200, meta = null) {
    res.status(status || 200).json({
      success: true,
      responseCode: 200,
      message,
      data
    })
  },
  /**
   *
   * @param {integer} responseCode Response code
   * @param {string} message Message of the response
   * @param {object} data Data of the response
   */
  __error(res, error, status = null, meta = null) {
    const _error = error
    res.status(status || error.code || 500).json({
      success: false,
      error: process.env.environment === 'production' ? null : error,
      message: error.message,
      meta: {
        ...meta,
        info: process.env.ENVIRONMENT == 'development' ? _error : null
      }
    })
  }

};
