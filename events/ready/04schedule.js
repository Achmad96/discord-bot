const cron = require("node-cron");
const broadcast = require("../../utils/broadcast");

const delayToDelete = 120000;

const schedule = (date, callback, options) => {
  cron.schedule(date, callback, options);
};

module.exports = client => {
  const guild = client.guilds.resolve("871691287865221120");

  if (!guild) return;

  schedule("00 07 * * *", () => broadcast(guild, true, "Selamat pagi [name]-kun!, selamat menjalankan aktivitas", delayToDelete), { timezone: "Indonesia/Jakarta" });
  schedule("00 12 * * *", () => broadcast(guild, true, "Selamat siang [name]-kun!", delayToDelete), { timezone: "Indonesia/Jakarta" });
  schedule("00 15 * * *", () => broadcast(guild, true, "Selamat sore [name]-kun!", delayToDelete), { timezone: "Indonesia/Jakarta" });
  schedule("00 21 * * *", () => broadcast(guild, true, "Selamat malam [name]-kun!, jangan lupa tidur ya...", delayToDelete), { timezone: "Indonesia/Jakarta" });
};
