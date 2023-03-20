const console = require('./logger');

module.exports = class EmailService {
  send(email) {
    console.log(`Sending email to ${email}`);
  }
};
