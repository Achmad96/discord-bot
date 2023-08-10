const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "delete",
  description: "delete messages from channels",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // deleted: true,
  options: [
    {
      name: "number",
      description: "number of messages to be deleted",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.ManageMessages],

  callback: async (client, interaction) => {
    const amount = interaction.options.getInteger("number");
    try {
      if (amount >= 100) {
        const batchSize = 100;
        const batches = Math.ceil(amount / batchSize);
        for (let i = 1; i <= batches; i++) {
          const remainingMessages = amount - i * batchSize;
          const messagesToDelete = i === batches ? batchSize + remainingMessages : batchSize;
          interaction.channel.bulkDelete(messagesToDelete);
        }
      } else {
        interaction.channel.bulkDelete(amount);
      }
      interaction.reply(`deleted ${amount} messages`);
    } catch (err) {
      console.log("Error deleting:" + err.message);
    }
  },
};
