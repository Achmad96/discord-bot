const { REST, Routes } = require("discord.js");
require("dotenv").config();
module.exports = () => {
  const rest = new REST().setToken(process.env.BOT_TOKEN);

  delete require.cache[require.resolve(__dirname)];

  rest
    .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.TEST_SERVER), { body: [] })
    .then(() => console.log("Successfully deleted all guild commands."))
    .catch(console.error);

  rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);
};
