const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
const log = require("../utils/log");

module.exports = client => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
    client.on(eventName, async arg => {
      for (const eventFile of eventFiles) {
        if (!eventFile.split("\\").pop().startsWith("--")) {
          log(`Register Event: ${eventFile.split("\\").pop()}`);
          const eventFunction = require(eventFile);
          await eventFunction(client, arg);
        }
      }
    });
  }
};
