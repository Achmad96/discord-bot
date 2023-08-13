const log = require("../../utils/log");

module.exports = client => {
  log(`${client.user.tag} is online.`);
};
