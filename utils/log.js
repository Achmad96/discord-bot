const colors = require("colors");
const keywords = ["GET".red, "ADD".green, "UPDATE".cyan, "DELETE".red, "WRITE".magenta, "LOG".bgYellow];
colors.enable();

module.exports = (property, ...theValues) => {
  const properties = property.split(" ");
  if (properties.length <= 0) {
    console.log(property.bold.gray, theValues.toString().blue);
    return;
  }
  let newWords = "";
  properties.map(prop => {
    const i = keywords.findIndex(keyword => keyword.toLowerCase().includes(prop));
    if (i) {
      newWords += prop.replace(prop, keywords[i]) + " ";
    }
  });
  console.log("newWords:", newWords.trim());
};
