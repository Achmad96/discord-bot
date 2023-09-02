const { EmbedBuilder } = require("discord.js");
module.exports = async (client, member) => {
  if (!member.user.bot) {
    const guild = await client.guilds.fetch("1147295714968342629");
    const channel = await guild.channels.fetch("1147306998669508678");
    const clientAvatar = client.user.displayAvatarURL({ extension: "png", size: 1024 });
    const embed = new EmbedBuilder()
      .setColor(0x004e82)
      .setAuthor({ name: client.user.username, iconURL: clientAvatar })
      .setTitle(`Welcome to ${guild.name} server!`)
      .addFields({ name: "Pesan", value: `Selamat datang <@${member.user.id}>` + " :wave:" })
      .setTimestamp()
      .setFooter({ text: "Created at" });
    channel.send({ embeds: [embed] });
  }
};
