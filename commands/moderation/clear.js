const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
module.exports = {
  name: "clear",
  description: "delete messages from channels",
  // devOnly: false,
  // testOnly: false,
  // deleted: true,
  options: [
    {
      name: "number",
      description: "number of messages to be deleted",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
      max_value: 1000,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.ManageMessages],

  callback: async (client, interaction) => {
    const amount = interaction.options.getInteger("number");
    let deletedMessagesCount = 0;
    const availableMessagesCount = await interaction.channel.messages.fetch({ limit: 100 });
    if (availableMessagesCount.size <= 0) return interaction.reply({ content: "There were no messages can be deleted", ephemeral: true });
    if (amount >= 100) {
      const batchSize = 100;
      const batches = Math.ceil(amount / batchSize);
      for (let i = 1; i <= batches; i++) {
        const remainingMessages = amount - i * batchSize;
        const messagesToDelete = i === batches ? batchSize + remainingMessages : batchSize;
        const deletedMessages = await interaction.channel.bulkDelete(messagesToDelete, true);
        deletedMessagesCount += deletedMessages.size;
      }
    } else {
      const deletedMessages = await interaction.channel.bulkDelete(amount, true);
      deletedMessagesCount += deletedMessages.size;
    }

    while (deletedMessagesCount < amount) {
      const limit = Math.min(amount - deletedMessagesCount, 100);
      const messages = await interaction.channel.messages.fetch({ limit: limit });
      const size = messages.size;
      if (!size || size === 0) return interaction.reply({ content: `Deleted all messages...`, ephemeral: true });
      for (const message of messages.values()) await message.delete();
      deletedMessagesCount += size;
      if (limit > 100 && deletedMessagesCount < amount) break;
    }

    interaction.reply({ content: `Deleted ${deletedMessagesCount} messages...`, ephemeral: true });
  },
};
