const fs = require("fs");
require("dotenv").config();
const log = require("./log");

module.exports = async client => {
  let commandsArray = [];
  const commandsFolder = fs.readdirSync("./commands");
  client.commands.clear();
  client.application.commands.set([]);

  for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      delete require.cache[require.resolve(`../commands/${folder}/${file}`)];
      const { name, description, options, callback } = require(`../commands/${folder}/${file}`);
      if (options !== undefined) {
        client.commands.set(name, { name, description, options, execute: callback });
        commandsArray.push({ name, description, options, execute: callback });
      } else {
        client.commands.set(name, { name, description, execute: callback });
        commandsArray.push({ name, description, execute: callback });
      }
    }
  }
  client.application.commands.set(commandsArray);
  return log("Log", "Reloaded all commands");
};
