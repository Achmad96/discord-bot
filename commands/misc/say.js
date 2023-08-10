const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "say",
  description: "say a message",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // deleted: true,
  options: [
    {
      name: "message",
      description: "the message you want to say",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionRequired: [PermissionFlagsBits.SendMessages],
  botPermission: [PermissionFlagsBits.SendMessages],
  callback: (client, interaction) => {
    interaction.reply({
      ephemeral: false,
      content: interaction.options.getString("message"),
    });
    console.log("test");
  },
};
