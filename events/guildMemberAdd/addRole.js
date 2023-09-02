module.exports = async (client, member) => {
  const guild = await client.guilds.fetch("1147295714968342629");
  const defaultRole = await guild.roles.fetch("1147304265174487081");
  member.roles.add(defaultRole);
};
