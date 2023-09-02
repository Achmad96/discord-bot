const cron = require("node-cron");
const broadcast = require("../../utils/broadcast");
const options = {
  timezone: "Asia/Jakarta",
};
const delayToDelete = 300_000;

const schedule = (date, callback, option = options) => {
  cron.schedule(date, callback, option);
};

module.exports = client => {
  const guild = client.guilds.resolve("871691287865221120");
  if (!guild) return;

  schedule("00 07 * * *", () => broadcast.sendPrivateMessage(guild, "Selamat pagi [name]-kun!, selamat menjalankan aktivitas", delayToDelete));
  schedule("00 12 * * *", () => broadcast.sendPrivateMessage(guild, "Selamat siang [name]-kun!", delayToDelete));
  schedule("00 15 * * *", () => broadcast.sendPrivateMessage(guild, "Selamat sore [name]-kun!", delayToDelete));
  schedule("00 21 * * *", () => broadcast.sendPrivateMessage(guild, "Selamat malam [name]-kun!, jangan lupa tidur ya...", delayToDelete));
};
