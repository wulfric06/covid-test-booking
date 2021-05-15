const RolesConstants = require('./roles.constants');

module.exports = Object.freeze({
  // ADMIN
  ADMIN: Object.freeze({
    UPDATE: [RolesConstants.ADMIN]
  }),
  // CUSTOMER
  CUSTOMER: Object.freeze({
    UPDATE: [RolesConstants.CUSTOMER]
  }),
  // DRIVER
  DRIVER: Object.freeze({
    UPDATE: [RolesConstants.DRIVER]
  }),
  // Condition for DISPUTE ADD
  DISPUTE: Object.freeze({
    UPDATE: [RolesConstants.CUSTOMER, RolesConstants.DRIVER]
  })
});
