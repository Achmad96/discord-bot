const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const { setValueOf, getValueOf } = require("../../utils/dataManager");
module.exports = {
  name: "setup",
  description: "Setup configuration for the client",
  options: [
    {
      name: "welcome-channel",
      description: "Select a welcome channel",
      type: ApplicationCommandOptionType.Channel,
    },
    {
      name: "announce-channel",
      description: "Select an announcement channel",
      type: ApplicationCommandOptionType.Channel,
    },
  ],
  callback: (client, interaction) => {
    const servers = getValueOf("servers");
    const i = servers.findIndex(server => server.id === interaction.guild.id);
    if (interaction.options.getChannel("welcome-channel")) servers[i]["welcomeChannel"] = interaction.options.getChannel("welcome-channel").id;
    else if (interaction.options.getChannel("announce-channel")) servers[i]["announceChannel"] = interaction.options.getChannel("announce-channel").id;
    interaction.reply({ content: "Berhasil mensetup channel" });
    setValueOf("servers", servers);
  },
};
