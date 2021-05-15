const jwt = require('jsonwebtoken');
const { StatusCodesConstants, MessageConstants } = require('../../../constants');
const { Response } = require('../../../../utils');

module.exports = {

  /**
   * Check the authentication
   */
  checkAuth: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ').pop().trim();
      // const { data: hashInfo } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // const userInfo = JSON.parse(Crypto.decrypt(hashInfo));
      const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userInfo = { id: result.sub };
      return next();
    } catch (error) {
      return res.status(StatusCodesConstants.UNAUTHORIZED).json(Response.sendError(
        MessageConstants.UNAUTHORIZED_ERROR,
        {},
        StatusCodesConstants.UNAUTHORIZED
      ));
    }
  },

};
