const cron = require("node-cron");
const broadcast = require("../../utils/broadcast");

module.exports = client => {
  const guild = client.guilds.resolve("871691287865221120");
  const listSchedule = [];
  if (!guild) return;

  const goodMorning = cron.schedule("00 7 * * *", () => broadcast(guild, true, "Selamat pagi [name]-kun!, selamat menjalankan aktivitas"));
  const goodAfternoon = cron.schedule("00 12 * * *", () => broadcast(guild, true, "Selamat siang [name]-kun!"));
  const evening = cron.schedule("00 15 * * *", () => broadcast(guild, true, "Selamat sore [name]-kun!"));
  const night = cron.schedule("00 21 * * *", () => broadcast(guild, true, "Selamat malam [name]-kun!, jangan lupa tidur ya..."));
  listSchedule.push(goodMorning, evening, night);
  return listSchedule;
};
