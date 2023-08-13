const { ApplicationCommandOptionType } = require("discord.js");
const { getValueOf, setValueOf } = require("../../utils/manageDatas");
const log = require("../../utils/log");

module.exports = {
  name: "chat",
  description: "Start chat with AI",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // deleted: true,
  options: [
    {
      name: "activate",
      description: "Turn on or off the AI chat",
      type: ApplicationCommandOptionType.Boolean,
      required: true,
    },
  ],
  callback: (client, interaction) => {
    try {
      const chatObjects = getValueOf("chatObjects") ? getValueOf("chatObjects") : setValueOf("chatObjects", []);
      const chatObject = {
        authorId: interaction.user.id,
        channelId: interaction.channel.id,
        datas: [],
      };
      const isExist = chatObjects.find(obj => obj.authorId === chatObject.authorId);

      if (getValueOf("activateAI")) {
        if (!isExist) {
          chatObjects.push(chatObject);
          interaction.reply("Halo! Apa yang bisa saya bantu?");
        } else {
          chatObjects.splice(chatObjects.indexOf(chatObject), 1);
          interaction.reply("AI dimatikan");
        }
      } else {
        interaction.reply("The AI feature is disabled.");
      }

      setValueOf("chatObjects", chatObjects);
    } catch (e) {
      log("ERROR: " + e.message);
    }
  },
};
