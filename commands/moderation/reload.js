const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "reload",
  description: "reload scripts",
  devOnly: true,
  // testOnly: Boolean,
  // deleted: true,
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    interaction.reply("Reload all commands.");
  },
};
