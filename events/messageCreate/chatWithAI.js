const { Configuration, OpenAIApi } = require("openai");
const { getValueOf, updateChatDatas } = require("../../utils/dataManager");
const log = require("../../utils/log");
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_API_ORG,
});

const openai = new OpenAIApi(config);

async function chatWithAI(message) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
    });
    updateChatDatas({ authorId: message.author.id, channelId: message.channel.id }, { role: "user", content: message.content }, { role: "assistant", content: response });
    return response.data.choices[0].text.trim();
  } catch (error) {
    log("Error communicating with OpenAI:", error.message);
    return "Maaf, ada masalah dalam berkomunikasi dengan AI saat ini.";
  }
}

module.exports = async (client, message) => {
  const activate = getValueOf("activateAI");
  const authorId = message.author.id;
  const channelId = message.channel.id;
  const chatObjects = getValueOf("chatObjects");
  const isSameChatObject = chatObjects.find(chatObject => chatObject.authorId === authorId && chatObject.channelId === channelId);

  if (activate === true && isSameChatObject && authorId !== client.user.id) {
    const response = await chatWithAI(message.content);
    message.channel.send(response);
    updateChatDatas({ authorId: message.author.id, channelId: message.channel.id }, { role: "user", content: message.content }, { role: "assistant", content: response });
  }
};
