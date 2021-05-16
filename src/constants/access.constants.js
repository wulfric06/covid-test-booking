const RolesConstants = require('./roles.constants');

module.exports = Object.freeze({
  // ADMIN
  ADMIN: Object.freeze({
    UPDATE: [RolesConstants.ADMIN]
  }),
  // CUSTOMER
  CUSTOMER: Object.freeze({
    UPDATE: [RolesConstants.CUSTOMER]
  })
});
