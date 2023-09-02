const { EmbedBuilder } = require("discord.js");
const log = require("../utils/log");
const formattedMessage = require("../utils/formattedMessage");
const { getValueOf } = require("./dataManager");
require("dotenv").config();

const sendPrivateMessage = async (guild, message, delayToDelete = 0) => {
  const client = await guild.members.fetch().then(m => m.find(member => member.user.bot && member.user.id === process.env.CLIENT_ID));
  const clientAvatar = client.user.displayAvatarURL({ extension: "png", size: 1024 });
  const members = await guild.members.fetch().then(m => m.filter(member => !member.user.bot));
  members.forEach(async member => {
    try {
      const name = typeof member.user.globalName === "string" ? member.user.globalName : member.user.username;

      const embed = new EmbedBuilder()
        .setColor(0x004e82)
        .setAuthor({ name: client.user.username, iconURL: clientAvatar })
        .setTitle("Schedule Time!")
        .addFields({ name: "Pesan", value: formattedMessage(message, { name: name }) + " :grin:" })
        .setTimestamp()
        .setFooter({ text: "Created at" });
      member.send({ embeds: [embed] }).catch(() => console.log(`Can't send message to ${member.user.username}`));
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
  }, delayToDelete);
};

const sendAnnouncement = async (guild, message) => {
  const serverId = getValueOf("servers").find(server => server.id === guild.id)?.announceChannel;
  if (!serverId) return "Failed to send an announcement";
  const announceChannel = await guild.channels.fetch(serverId);
  const embed = new EmbedBuilder()
    .setColor(0x004e82)
    // .setAuthor({ name: client.user.username, iconURL: clientAvatar })
    .setTitle(`:bangbang: **Announcement** :bangbang:`)
    .addFields({ name: "Pesan", value: message })
    .setTimestamp()
    .setFooter({ text: "Created at" });
  announceChannel.send({ embeds: [embed] });
  return "Sucess send an announcement";
};

module.exports = {
  sendAnnouncement,
  sendPrivateMessage,
};
