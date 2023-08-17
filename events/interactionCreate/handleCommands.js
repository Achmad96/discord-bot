require("dotenv").config();
const devs = process.env.DEVS_ID;
const testServer = process.env.TEST_SERVER;
const getLocalCommands = require("../../utils/getLocalCommands");
const log = require("../../utils/log");
const { Collection } = require("discord.js");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { cooldowns } = client;

  const localCommands = getLocalCommands();
  try {
    const commandObject = localCommands.find(cmd => cmd.name === interaction.commandName);

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.user.id)) {
        interaction.reply({
          content: "Only developers are allowed to run this command.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: "This command cannot be ran here.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "Not enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (!devs.includes(interaction.user.id)) {
      if (!cooldowns.has(commandObject.name)) {
        cooldowns.set(commandObject.name, new Collection());
      }
      const timestamps = cooldowns.get(commandObject.name);
      const defaultCooldownDuration = 3;
      const cooldownAmount = (commandObject.cooldown || defaultCooldownDuration) * 1000;
      const now = Date.now();

      if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);
          return interaction.reply({ content: `Please wait, you are on a cooldown for \`${commandObject.name}\`. You can use it again \`<t:${expiredTimestamp}:R>\``, ephemeral: true });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    log("There was an error running this command:", error.message);
  }
};
