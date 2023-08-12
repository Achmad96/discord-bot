const fs = require("fs");
const path = require("path");
const colorConsole = require("../utils/colorConsole");
const filePath = path.join(__dirname, "..", "datas.json").split("\\").join("/");

const defaultJsonContent = {
  activateAI: false,
  debugConsole: false,
  chatObjects: [],
};

const getJsonContents = () => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    // colorConsole("Get data", "datas.json");
    return JSON.parse(fileContent.toString());
  } catch (e) {
    writeJsonContents();
    colorConsole("File content doesn't exist", "creating a new one...");
  }
};

const writeJsonContents = (content = defaultJsonContent()) => {
  const newContent = JSON.stringify(sortObjectKeysBasedOnDefault(validateJsonContent(content)), null, 2);
  fs.writeFileSync(filePath, newContent);
  colorConsole("Write data", "datas.json", `\nCONTENTS: ${newContent}`);
  return "Success write contents!";
};

const getValueOf = property => {
  const jsonContents = getJsonContents();
  return jsonContents[property];
};

const addProperty = (key, value) => {
  const jsonContents = getJsonContents();
  jsonContents[key] = value;
  writeJsonContents(jsonContents);
  return getValueOf(key);
};

const setValueOf = (key, newValue) => {
  const jsonContents = getJsonContents();
  if (getValueOf(key) === undefined) return addProperty(key, newValue);
  else if (getValueOf(key) !== newValue) {
    jsonContents[key] = newValue;
    writeJsonContents(jsonContents);
    return getValueOf(key);
  }
  return "The property doesn't exist";
};

const updateChatDatas = (object, ...datas) => {
  const jsonContents = getJsonContents();
  const chatObjects = jsonContents.chatObjects;
  chatObjects.forEach(chatObject => {
    if (chatObject.authorId === object.authorId && chatObject.channelId === object.channelId) {
      for (const data of datas) chatObjects[chatObjects.indexOf(chatObject)].datas.push(data);
    }
  });
  writeJsonContents(jsonContents);
  return "Success update datas!";
};

const deleteProperty = property => {
  const jsonContents = getJsonContents();
  if (jsonContents[property] === undefined) return undefined;
  jsonContents.splice(jsonContents.indexOf(property), 1);
  writeJsonContents(jsonContents);
  return "Success delete property!";
};

const sortObjectKeysBasedOnDefault = object => {
  const sortedKeys = Object.keys(object).sort((a, b) => {
    const indexA = Object.keys(defaultJsonContent).indexOf(a);
    const indexB = Object.keys(defaultJsonContent).indexOf(b);
    return indexA - indexB;
  });

  const sortedObjects = {};
  sortedKeys.forEach(key => (sortedObjects[key] = object[key]));

  return sortedObjects;
};

const validateJsonContent = jsonContent => {
  Object.keys(defaultJsonContent).forEach(key => {
    if (!(key in jsonContent)) {
      jsonContent[key] = defaultJsonContent[key];
      console.log(`Key ${key}'s not in defaultJsonContent, add it.`);
    }
  });
  return jsonContent;
};

module.exports = {
  updateChatDatas,
  addProperty,
  getValueOf,
  setValueOf,
  deleteProperty,
};
