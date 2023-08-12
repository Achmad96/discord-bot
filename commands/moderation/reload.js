const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
// const getAllFiles = require("../../utils/getAllFiles");
// const path = require("path");
// const getLocalCommands = require("../../utils/getLocalCommands");
const loadCommands = require("../../utils/loadCommands");

module.exports = {
  name: "reload",
  description: "reload scripts",
  devOnly: true,
  // testOnly: Boolean,
  deleted: true,
  options: [
    {
      name: "command",
      description: "command's name to reload, or `all` to reload all commands",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    const commandName = interaction.options.getString("command").toLowerCase();
    loadCommands(client, commandName);
    // const commands = getLocalCommands();
    // if (commandName === "all") {
    //   const getCommandsCategories = getAllFiles(path.join(__dirname, ".."), true);
    //   for (const commandCategory of getCommandsCategories) {
    //     const commandFiles = getAllFiles(commandCategory);
    //     for (const commandFile of commandFiles) {
    //       delete require.cache[require.resolve(commandFile)];
    //       try {
    //         const { name, description, options, callback } = require(commandFile);
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //     }
    //   }
    //   return interaction.reply("Reload all commands.");
    // } else if (commands.find(cmd => cmd.name === commandName)) {
    //   return interaction.reply(`Reload \`${commandName}\`'s command.`);
    // } else {
    //   return interaction.reply(`There is no command with name \`${commandName}\`!`);
    // }
  },
};
