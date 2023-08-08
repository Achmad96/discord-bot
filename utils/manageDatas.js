const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "datas.json").split("\\").join("/");

const getJsonContents = () => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent.toString());
  } catch (e) {
    return "Can't read file " + filePath;
  }
};

const updateJsonContents = (content) => {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  return "Success update contents!";
};

const defaultJsonContent = () => {
  return {
    activate: false,
    datas: [],
  };
};

const updateDatas = (...data) => {
  const jsonContents = getJsonContents();
  for (const d of data) jsonContents.datas.push(d);
  fs.writeFileSync(filePath, JSON.stringify(jsonContents, null, 2));
  return "Success update datas!";
};

module.exports = {
  getJsonContents,
  defaultJsonContent,
  updateJsonContents,
  updateDatas,
};
