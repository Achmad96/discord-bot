const { EmbedBuilder } = require("discord.js");
const log = require("../utils/log");

module.exports = async (guild, message, useEmbeded = false, deleteToDelay = 0) => {
  const members = await guild.members.fetch().then(m => m.filter(member => !member.user.bot));
  const client = await guild.members.fetch().then(m => m.find(member => member.user.bot && member.user.id === "1138045211713478708"));
  const clientAvatar = client.user.displayAvatarURL({ extension: "png", size: 1024 });

  members.forEach(async member => {
    try {
      const name = typeof member.user.globalName === "string" ? member.user.globalName : member.user.username;
      const messages = `${message.replaceAll("[name]", name)}`;
      if (useEmbeded) {
        const embed = new EmbedBuilder()
          .setColor(0x004e82)
          .setAuthor({ name: client.user.username, iconURL: clientAvatar })
          .setTitle("Schedule Time!")
          .addFields({ name: "Pesan", value: messages + " :grin:" })
          .setTimestamp()
          .setFooter({ text: "Created at" });
        member.send({ embeds: [embed] }).catch(() => console.log(`Can't send message to ${member.user.username}`));
      } else member.send(messages);
      log(`Sent message to ${name}`);
    } catch (error) {
      log("Error:", error.message);
    }
  });

  setTimeout(() => {
    members.forEach(async member => {
      await member.user.createDM().then(dmChannel => {
        dmChannel.messages.fetch({ limit: 100 }).then(messages => {
          messages = messages.filter(m => m.author.id !== member.user.id);
          let c = messages.size;
          messages.forEach(msg => {
            msg.delete().then(() => {
              c--;
              if (c === 0) console.log(`Deleted the last message from bot in ${member.user.username}`);
            });
          });
        });
      });
    });
  }, deleteToDelay);
};
