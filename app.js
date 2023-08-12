require("dotenv").config();
const eventHandler = require("./handlers/eventHandler");
const { Client, IntentsBitField, Partials } = require("discord.js");

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.DirectMessages],
  partials: [Partials.Channel],
});

eventHandler(client);
client.login(process.env.BOT_TOKEN);
