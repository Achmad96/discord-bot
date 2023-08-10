async function backup() {
  const now = Date.now();
  const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
  const channel = await client.channels.fetch(interaction.channelId);
  let max = [];
  await channel.messages.fetch().then(messages => {
    messages.forEach(message => {
      if (message.createdTimestamp <= fourteenDaysAgo) {
        max.push(message);
      }
    });
  });
  if (max.length > 0 && messageToDelete > max.length)
    messageToDelete = max.length;
  for (const message of max) {
    await message.delete().catch(error => {
      console.error(`Error deleting message: ${error}`);
    });
  }
}
