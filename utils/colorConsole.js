const colors = require("colors");
const keywords = ["GET".red, "ADD".green, "UPDATE".cyan, "DELETE".red, "WRITE".magenta];
colors.enable();

module.exports = (property, ...theValues) => {
  const firstWord = property.split(" ")[0];
  const indexKey = keywords.findIndex(keyword => keyword.toLowerCase().includes(firstWord.toLowerCase()));
  if (indexKey === undefined) {
    console.log(property.bold.gray, theValues.toString().blue);
    return;
  }
  console.log(property.replace(firstWord, keywords[indexKey].toString().bold), theValues.toString().blue);
};