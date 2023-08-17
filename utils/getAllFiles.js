const fs = require("fs");
const path = require("path");
const log = require("./log");
module.exports = function getAllFiles(directory, folderOnly = false) {
  let filenames = [];
  const files = fs.readdirSync(directory, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (folderOnly) {
      if (file.isDirectory()) {
        filenames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        if (file.name.startsWith("--")) continue;
        filenames.push(filePath);
      }
    }
  }
  return filenames;
};
