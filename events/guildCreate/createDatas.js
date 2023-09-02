const { setValueOf, getValueOf } = require("../../utils/dataManager");

module.exports = guild => {
  const servers = getValueOf("servers");
  servers.push({ name: guild.name, id: guild.id, welcomeChannel: undefined, announceChannel: undefined });
  setValueOf("servers", servers);
};
