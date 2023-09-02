const { AttachmentBuilder } = require("discord.js");
const { getValueOf } = require("../../utils/dataManager");
const log = require("../../utils/log");
const { createCanvas, loadImage } = require("canvas");

module.exports = async (client, member) => {
  if (!member.user.bot) {
    try {
      const servers = getValueOf("servers");
      const server = servers.find(server => server.id && server.id === member.guild.id);
      const guild = await client.guilds.fetch(server.id);
      const channel = await guild.channels.fetch(server.welcomeChannel);
      const canvas = createCanvas(1024, 500);
      const ctx = canvas.getContext("2d");
      ctx.font = "72px sans-serif";
      ctx.fillStyle = "#ffffff";
      await loadImage("https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg").then(img => {
        ctx.drawImage(img, 0, 0, 1024, 500);
        ctx.fillText("welcome", 360, 360);
        ctx.beginPath();
        ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();
      });
      ctx.font = "42px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      const memberTag = member.user.tag;
      ctx.fillText(memberTag.charAt(0).toUpperCase() + memberTag.slice(1, memberTag.length), 512, 410);
      ctx.font = "32px sans-serif";
      ctx.fillStyle = "#03fc49";
      ctx.fillText(`You're the ${member.guild.memberCount}th`, 512, 455);
      ctx.beginPath();
      ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      await loadImage(member.user.displayAvatarURL({ extension: "png", size: 1024 })).then(img => {
        ctx.drawImage(img, 393, 47, 238, 238);
      });
      const attachement = new AttachmentBuilder(canvas.toBuffer(), { name: `welcome-${member.user.id}.png` });
      channel.send({ content: `Welcome <@${member.user.id}> :wave:`, files: [attachement] });
    } catch (error) {
      log("Error: " + error.message);
    }
  }
};
