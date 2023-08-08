const { ActivityType } = require("discord.js");

module.exports = (client) => {
  const activitiesName = [
    {
      name: "Server Kodok",
      type: ActivityType.Watching,
    },
    {
      name: "use commands",
      type: ActivityType.Listening,
    },
  ];
  let i = 0;
  setInterval(() => {
    i >= activitiesName.length - 1 ? (i = 0) : (i += 1);
    const activityName = activitiesName[i];
    client.user.setPresence({
      activities: [activityName],
      status: "idle",
    });
  }, 5000);
};
