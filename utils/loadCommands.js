const fs = require("fs");

module.exports = (client, commandName) => {
  const commandsArray = [];
  if (commandName) {
    const commandsFolder = fs.readdirSync("./commands");
    for (const folder of commandsFolder) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
      for (const file of commandFiles) {
        const commandFile = require(`../commands/${folder}/${file}`);
        const properties = { folder, ...commandFile };
        client.commands.set(commandFile.name, properties);
        commandsArray.push(commandFile.toJSON());
        continue;
      }
    }
  }
};
