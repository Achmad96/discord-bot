require("dotenv").config();
const eventHandler = require("./handlers/eventHandler");
const { Client, IntentsBitField, Partials, Collection } = require("discord.js");

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.DirectMessages],
  partials: [Partials.Channel],
});

client.cooldowns = new Collection();
client.commands = new Collection();

eventHandler(client);
client.login(process.env.BOT_TOKEN);
