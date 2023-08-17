const { EmbedBuilder } = require("discord.js");
module.exports = {
  cooldown: 5,
  name: "lompat",
  description: "lompat gak nih?",
  callback: (client, interaction) => {
    const embed = new EmbedBuilder().setTitle("Lompat nih").setImage("https://media.tenor.com/iHmhywCIPiAAAAAC/kodok-acumalaka.gif");
    interaction.reply({ embeds: [embed] });
  },
};
