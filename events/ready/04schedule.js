const cron = require("node-cron");
const broadcast = require("../../utils/broadcast");

const delayToDelete = 300_000; // 5 minutes

const options = {
  timezone: "Asia/Jakarta",
};

const schedule = (date, callback, option = options) => {
  cron.schedule(date, callback, option);
};

module.exports = client => {
  const guild = client.guilds.resolve("871691287865221120");

  if (!guild) return;

  schedule("00 07 * * *", () => broadcast(guild, "Selamat pagi [name]-kun!, selamat menjalankan aktivitas", true, delayToDelete));
  schedule("00 12 * * *", () => broadcast(guild, "Selamat siang [name]-kun!", true, delayToDelete));
  schedule("00 15 * * *", () => broadcast(guild, "Selamat sore [name]-kun!", true, delayToDelete));
  schedule("00 21 * * *", () => broadcast(guild, "Selamat malam [name]-kun!, jangan lupa tidur ya...", true, delayToDelete));
};
