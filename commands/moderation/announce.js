const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const broadcast = require("../../utils/broadcast");
require("dotenv").config();
module.exports = {
  name: "announce",
  description: "send message to announcement channel",
  // devOnly: false,
  // testOnly: false,
  // deleted: true,
  options: [
    {
      name: "message",
      description: "input the message to send",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  callback: async (client, interaction) => {
    const guild = await client.guilds.fetch(interaction.guild.id);
    interaction.reply({ content: await broadcast.sendAnnouncement(guild, interaction.options.getString("message")) });
  },
};
