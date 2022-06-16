const { Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
  name: "status",
  description: "Menampilkan status koneksi client dan database.",

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const Response = new MessageEmbed().setColor("BLURPLE").setDescription(
      `**Bot Status**
      \n **Klien**: \`🟢 Online!\` 
      \n **Database**: \`${switchTo(connection.readyState)}\`
      \n **Ping Klien**: \`${client.ws.ping}ms\`
      \n **Ping Message**: \` ${Date.now() - interaction.createdTimestamp}ms \`
      \n **Aktif**: <t:${parseInt(client.readyTimestamp / 1000)}:R>
    `
    );

    interaction.reply({ embeds: [Response] });
  },
};

function switchTo(val) {
  var status = " ";
  switch (val) {
    case 0:
      status = `🔴 TERPUTUS`;
      break;
    case 1:
      status = `🟢 TERHUBUNG`;
      break;
    case 2:
      status = `🟠 MENGHUBUNGKAN`;
      break;
    case 3:
      status = `🔵 MEMUTUSKAN KONEKSI`;
      break;
  }

  return status;
}
