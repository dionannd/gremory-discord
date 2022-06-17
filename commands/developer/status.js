const { Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../events/client/ready");

module.exports = {
  name: "status",
  description: "Menampilkan status koneksi client dan database.",

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const Response = new MessageEmbed().setColor("BLURPLE").setDescription(
      `**Bot Status**\n
      **Klien**: \`🟢 Online!\`
      **Database**: \`${switchTo(connection.readyState)}\`
      **Ping Klien**: \`${client.ws.ping}ms\`
      **Ping Message**: \` ${Date.now() - interaction.createdTimestamp}ms \` \n
      **Aktif**: <t:${parseInt(client.readyTimestamp / 1000)}:R>
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
