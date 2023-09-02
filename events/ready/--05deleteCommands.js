const { REST, Routes } = require("discord.js");
require("dotenv").config();
const log = require("../../utils/log");
const fs = require("fs");

module.exports = () => {
  const rest = new REST().setToken(process.env.BOT_TOKEN);
  const commandsFolder = fs.readdirSync("./commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      delete require.cache[require.resolve(`../../commands/${folder}/${file}`)];
    }
  }

  rest
    .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.TEST_SERVERS), { body: [] })
    .then(() => log("Successfully deleted all guild commands."))
    .catch(console.error);

  rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
    .then(() => log("Successfully deleted all application commands."))
    .catch(console.error);
};
