module.exports = Object.freeze({

  // common
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED_ERROR: 'You are unauthorized',
  FORBIDDEN: 'You are authenticated but do not have access to what you are trying to do',
  NOT_FOUND: 'The resource you are looking for does not exist',
  RESOURCE_EXISTS: 'The resource you are requesting already exists',
  EMAIL_ALREADY_REGISTERED: 'Email is already registered',
  PHONE_ALREADY_REGISTERED: 'Phone number is already registered',
  PASSWORD_RESET: 'Password has been reset successfully',
  INVALID_EMAIL_OR_PHONE: '^Invalid email or phone',
  EMAIL_OR_PHONE_NOT_REGISTERED_YET: 'Email or phone is not registered yet',
  NO_USER_FOUND: 'No user found with these details',
  INVALID_PASSWORD: 'Invalid password',
  NOT_A_VALID_KEY: '%{value} is not valid',
  INVALID: 'Not Valid',

  // customer management
  USER_LOGGED_IN: 'User has been successfully logged in',
  USER_LOGGED_OUT: 'User has been successfully logged out',
  USER_REGISTERED_SUCCESSFULLY: 'User has been registered successfully',
  USER_INACTIVE: 'Your account is not active or approved. Please contact your administrator',
  USER_PROFILE_UPDATED: 'User profile has been updated',
  USER_PROFILE_FETCHED: 'User profile fetched successfully',
  USERS_FETCHED: 'Users fetched successfully',
  USERS_WITHOUT_CARD_FETCHED: 'Users without cards have been fetched successfully',
  USER_ACCOUNT_DETAILS_FETCHED: 'User account details fetched successfully',
  USER_NOT_PRESENT: 'User does not Exist',
  USER_STATUS_UPDATED: 'User status has been updated successfully',

  // user 
  USER_FETCHED_SUCCESSFULLY: 'User fetched successfully',
  USER_ALREADY_REGISTERED: 'User is already registered',
  USER_ADD_SUCCESSFULLY: 'User added successfully',
  USER_UPDATE_SUCCESSFULLY: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  EMP_ID_ALREADY_REGISTERED: 'Employee id is already registered',

  // lab 
  LAB_FETCHED_SUCCESSFULLY: 'Lab fetched successfully',
  // LAB_ALREADY_REGISTERED: 'Lab is already registered',
  LAB_ADD_SUCCESSFULLY: 'Lab added successfully',
  LAB_UPDATE_SUCCESSFULLY: 'Lab updated successfully',
  LAB_DELETED: 'Lab deleted successfully',
  LAB_BOOKING_FETCHED_SUCCESSFULLY: 'Booking fetched successfully for this lab',

  // test 
  TEST_FETCHED_SUCCESSFULLY: 'Test fetched successfully',
  TEST_ADD_SUCCESSFULLY: 'Test booked successfully',
  TEST_UPDATE_SUCCESSFULLY: 'Test updated successfully',
  TEST_DELETED: 'Test deleted successfully',
  TEST_NOT_PRESENT: 'Test does not Exist',


});