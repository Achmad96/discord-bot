const { EmbedBuilder } = require("discord.js");
module.exports = (client, message) => {
  if (message.author.bot) return;

  if (message.channel.type === 1) {
    const dmLogEmbed = new EmbedBuilder()
      .setColor(0x004e82)
      .setTitle(`${message.author.tag} dmed the bot and said: `)
      .setDescription(message.content)
      .setFooter({ text: `User's id: ${message.author.id}` });
    client.channels.fetch("1139724529330036807").then(channel => {
      channel.send({ embeds: [dmLogEmbed] });
    });
  }
};
