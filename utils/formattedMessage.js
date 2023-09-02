module.exports = function formattedMessage(message, replacements = {}) {
  let formattedMessage = message;

  Object.entries(replacements).forEach(([key, value]) => {
    formattedMessage = formattedMessage.replaceAll(`[${key}]`, value);
  });

  return formattedMessage;
};
