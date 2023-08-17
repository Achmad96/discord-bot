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
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  botPermissions: [PermissionFlagsBits.ManageMessages],

  callback: async (client, interaction) => {
    const amount = interaction.options.getInteger("number");
    let deletedMessagesCount = 0;

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
      const msgs = await interaction.channel.messages.fetch({ limit: limit });
      const size = msgs.size;
      if (!size || size === 0) return interaction.reply({ content: `Deleted the last messages...`, ephemeral: true });
      for (const msg of msgs.values()) await msg.delete();
      deletedMessagesCount += size;
      if (limit > 100 && deletedMessagesCount < amount) break;
    }

    interaction.reply({ content: `Deleted ${deletedMessagesCount} messages...`, ephemeral: true });
  },
};
