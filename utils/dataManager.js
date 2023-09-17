const fs = require("fs");
const path = require("path");
const log = require("./log");
const filePath = path.join(__dirname, "..", "datas.json").split("\\").join("/");

const defaultJsonContent = {
  activateAI: false,
  debugConsole: false,
  chatObjects: [],
  servers: [],
};

const getJsonContents = () => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent.toString());
  } catch (e) {
    writeJsonContents();
    log("File content doesn't exist", "creating a new one...");
  }
};

const writeJsonContents = (content = defaultJsonContent) => {
  const newContent = JSON.stringify(sortObjectKeysBasedOnDefault(validateJsonContent(content)), null, 2);
  fs.writeFileSync(filePath, newContent);
  log("Write data", "datas.json");
  return "Success write contents!";
};

const getValueOf = path => {
  const jsonContents = getJsonContents();
  const keys = path.split(".");
  let result = jsonContents;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result;
};

const addProperty = (key, value) => {
  const jsonContents = getJsonContents();
  jsonContents[key] = value;
  writeJsonContents(jsonContents);
  return getValueOf(key);
};

const setValueOf = (path, newValue) => {
  const jsonContents = getJsonContents();
  const keys = path.split(".");
  let currentObj = jsonContents;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!currentObj[key] || typeof currentObj[key] !== "object") {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  }
  const lastKey = keys[keys.length - 1];
  currentObj[lastKey] = newValue;
  writeJsonContents(jsonContents);
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
      log(`Key ${key}'s not in defaultJsonContent, add it.`);
    }
  });

  Object.keys(jsonContent).forEach(key => {
    if (!(key in defaultJsonContent)) {
      delete jsonContent[key];
      log(`Key ${key}'s not in defaultJsonContent, delete it.`);
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
