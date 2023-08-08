const { Configuration, OpenAIApi } = require("openai");
const { getJsonContents, updateDatas } = require("../../utils/manageDatas");
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

async function chatWithAI(message) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
    });
    updateDatas(
      { role: "user", content: message },
      { role: "assistant", content: response }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error communicating with OpenAI:", error.message);
    return "Maaf, ada masalah dalam berkomunikasi dengan AI saat ini.";
  }
}

module.exports = async (client, message) => {
  const activate = getJsonContents().activate;
  const channelId = 1138257893318197248;
  if (
    message.channel.id == channelId &&
    activate === true &&
    message.author.id !== client.user.id
  ) {
    const response = await chatWithAI(message.content);
    message.channel.send(response);
  }
};
