const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping",
  aliases: ["p"],

  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({ content: "Pong!" });
  },
};
