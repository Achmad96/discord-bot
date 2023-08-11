const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
module.exports = () => {
  const rest = new REST().setToken(token);
  rest
    .put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);
};
