module.exports = {
  name: "ping",
  description: "Pong!",
  testOnly: true,
  // devOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply({ content: `${client.ws.ping}ms`, ephemeral: true });
  },
};
