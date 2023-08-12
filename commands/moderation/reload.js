const { ApplicationCommandOptionType, PermissionFlagsBits, Collection } = require("discord.js");
const loadCommands = require("../../utils/loadCommands");

module.exports = {
  name: "reload",
  description: "reload scripts",
  // devOnly: true,
  // testOnly: Boolean,
  options: [
    {
      name: "command",
      description: "command's name to reload, or `all` to reload all commands",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    const commandName = interaction.options.getString("command")?.toLowerCase();
    client.commands = new Collection();
    loadCommands(client, interaction, commandName);
  },
};
