const { EmbedBuilder } = require("discord.js");

module.exports = async (guild, useEmbeded = false, message) => {
  const members = await guild.members.fetch().then(m => m.filter(member => !member.user.bot));
  const client = await guild.members.fetch().then(m => m.find(member => member.user.bot && member.user.id === "1138045211713478708"));
  const clientAvatar = client.user.displayAvatarURL({ extension: "png", size: 1024 });

  members.forEach(async member => {
    try {
      const name = typeof member.user.globalName === "string" ? member.user.globalName : member.user.username;
      const messages = `${message.replaceAll("[name]", `${name}`)}`;
      if (useEmbeded) {
        const embed = new EmbedBuilder()
          .setColor(0x004e82)
          .setAuthor({ name: client.user.username, iconURL: clientAvatar })
          .setTitle("Schedule Time!")
          .addFields({ name: "Pesan", value: messages + " :grin:" })
          .setTimestamp()
          .setFooter({ text: "Created at" });
        member.send({ embeds: [embed] });
      } else member.send(messages);
      console.log(`Sent message to ${name}`);

      const dmChannel = await member.user.createDM();
      const msgs = await dmChannel.messages.fetch({ limit: 1 });
      msgs.forEach(msg => msg.delete());
      console.log("Delete the last message...");
    } catch (error) {
      console.log("Error:", error.message);
    }
  });
};
