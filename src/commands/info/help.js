const {
  Client,
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "Untuk melihat semua command bot yang tersedia.",
  aliases: ["h"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {},
};
