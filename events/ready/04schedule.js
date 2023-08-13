const cron = require("node-cron");
const broadcast = require("../../utils/broadcast");

const delayToDelete = 300000; // 5 minutes

const options = {
  timezone: "Asia/Jakarta",
};

const schedule = (date, callback, option = options) => {
  cron.schedule(date, callback, option);
};

module.exports = client => {
  const guild = client.guilds.resolve("871691287865221120");

  if (!guild) return;

  schedule("00 07 * * *", () => broadcast(guild, true, "Selamat pagi [name]-kun!, selamat menjalankan aktivitas", delayToDelete));
  schedule("00 12 * * *", () => broadcast(guild, true, "Selamat siang [name]-kun!", delayToDelete));
  schedule("00 15 * * *", () => broadcast(guild, true, "Selamat sore [name]-kun!", delayToDelete));
  schedule("00 21 * * *", () => broadcast(guild, true, "Selamat malam [name]-kun!, jangan lupa tidur ya...", delayToDelete));
};
