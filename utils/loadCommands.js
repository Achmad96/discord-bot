const fs = require("fs");
const getApplicationCommands = require("../utils/getApplicationCommands");
const { REST, Routes } = require("discord.js");
const log = require("./log");
require("dotenv").config();
const rest = new REST().setToken(process.env.BOT_TOKEN);

module.exports = async (client, interaction, commandName) => {
  const applicationCommands = await getApplicationCommands(client);

  const arraysCommands = Array.from(await applicationCommands.cache);
  log("Array Commands:", arraysCommands);

  if (!commandName || commandName.trim() === "" || commandName === "all") {
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
    interaction.reply({
      content: `Reloaded all commands`,
    });
    return console.log("Reloaded all commands");
  } else if (commandName && commandName !== "all" && (await applicationCommands.cache.find(cmd => cmd.name === commandName))) {
    const commandsFolder = fs.readdirSync("./commands");
    for (const folder of commandsFolder) {
      const file = fs.readdirSync(`./commands/${folder}`).find(file => file === `${commandName}.js`);
      delete require.cache[require.resolve(`../commands/${folder}/${file}`)];
      const command = await applicationCommands.cache.find(cmd => cmd.name === commandName);
      log("CommandId:", command.id);
      rest
        .delete(Routes.applicationCommand(client.user.id, command.id))
        .then(() => interaction.reply({ content: `Sucessfully reload ${commandName}` }))
        .catch(err => console.log("Error: ", err.message));
      const { name, description, options, callback } = require(`../commands/${folder}/${file}`);
      options !== undefined ? client.commands.set(name, { name, description, options, execute: callback }) : client.commands.set(name, { name, description, execute: callback });
      log("ArrayCommands:", arraysCommands);
      break;
    }
    interaction.reply({ ephemeral: true, content: `Reload \`${commandName}\`` });
  } else return interaction.reply({ ephemeral: true, content: `There's no command named \`${commandName}\`` });
};
