module.exports = Object.freeze({

  // common
  SORT_TYPES: ['DESC', 'ASC'],
  LIMIT: 25,
  OFFSET: 0,
  CURRENT_PAGE: 1,

  // user
  USER_SEARCH_BY: ['first_name', 'email', 'mobile_number', 'address', 'zip_code'],
  USER_SORT_BY: ['created_at', 'name', 'first_name', 'last_name', 'email', 'mobile_number', 'status'],
  USER_SORT_TYPES: ['DESC', 'DESC'],

  // labs
  LAB_SORT_BY: ['name'],
  LAB_SORT_TYPES: ['ASC', 'DESC'],

  // test
  TEST_SORT_BY: ['schedule_date'],
  TEST_SORT_TYPES: ['ASC', 'DESC'],

});
