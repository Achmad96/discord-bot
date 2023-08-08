const { ApplicationCommandOptionType } = require("discord.js");
const {
  getJsonContents,
  updateJsonContents,
  defaultJsonContent,
} = require("../../utils/manageDatas");

module.exports = {
  name: "chat",
  description: "Start chat with AI",
  // testOnly: true,
  // devOnly: Boolean,
  // deleted: true,
  options: [
    {
      name: "activate",
      description: "Turn on/off the ai",
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  callback: (client, interaction) => {
    try {
      let jsContents;
      const value = interaction.options?._hoistedOptions[0]?.value;
      try {
        jsContents = getJsonContents();
        jsContents.activate = value ? value : !jsContents.activate;
        updateJsonContents(jsContents);
      } catch (error) {
        updateJsonContents(defaultJsonContent());
        console.log(error);
      }

      if (jsContents?.activate) {
        interaction.reply("Halo! Apa yang bisa saya bantu?");
        return;
      } else if (jsContents?.activate === false) {
        interaction.reply("AI dimatikan...");
        return;
      }
    } catch (e) {
      console.log("ERROR: " + e.message);
    }
  },
};
