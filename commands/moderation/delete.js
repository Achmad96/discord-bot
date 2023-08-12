const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
let j = 0;
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
    if (amount >= 100) {
      const batchSize = 100;
      const batches = Math.ceil(amount / batchSize);
      for (let i = 1; i <= batches; i++) {
        const remainingMessages = amount - i * batchSize;
        const messagesToDelete = i === batches ? batchSize + remainingMessages : batchSize;
        await interaction.channel
          .bulkDelete(messagesToDelete, true)
          .then(() => {
            j++;
            console.log(`${j}: Sucessfully deleted ${messagesToDelete} message.`);
          })
          .catch(err => console.log("Error: " + err.message));
      }
    } else {
      interaction.channel
        .bulkDelete(amount, true)
        .then(() => {
          j++;
          console.log(`${j}: Sucessfully deleted ${amount} message.`);
        })
        .catch(err => console.log("Error: " + err.message));
    }
    interaction.reply(`deleted ${amount} messages`);
  },
};
