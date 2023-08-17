const { ApplicationCommandOptionType, PermissionFlagsBits, Collection } = require("discord.js");
const loadCommands = require("../../utils/loadCommands");

module.exports = {
  name: "reload",
  description: "reload scripts",
  // devOnly: true,
  // testOnly: Boolean,
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    client.commands = new Collection();
    loadCommands(client);
    interaction.reply({
      content: `Reloaded all commands`,
      ephemeral: true,
    });
  },
};
