const path = require('path');
const { StatusCodesConstants, EmailSubjectsConstants } = require('../../../constants');
const { Chalk, Pug, Mailer } = require('../../../../utils');

const UserHelper = {

  /**
   * Send the password to user's email and password
   */
  sendPasswordToUserEmailAndPhone: ({
    firstName, lastName, email
  }, { password }) => {
    try {
      // Send the password to the user's email
      const userName = `${firstName || ''} ${lastName || ''}`.trim();
      (async () => {
        const html = await Pug.renderFile(path.join(__dirname, '../../../templates/registration-password.pug'), {
          userName,
          password
        });

        Mailer.sendMail({
          to: email,
          subject: EmailSubjectsConstants.REGISTRATION_DONE,
          html
        });
      })();

      // Send the password to the user's phone
    } catch ({ message, code, error = StatusCodesConstants.INTERNAL_SERVER_ERROR }) {
      Chalk.error(message, { message, code, error });
      throw new Error(message);
    }
  }
};

module.exports = UserHelper;
