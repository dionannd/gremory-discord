const { Message } = require("discord.js");
const client = require("../../../index");
const prefix = require("../../models/prefix");

module.exports = {
  name: "messageCreate",
  permission: "MANAGE_CHANNEL",

  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    const data = await prefix.findOne({
      guildId: message.guild.id,
    });

    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if (data) {
      const prefix = data.prefix;

      if (!message.content.startsWith(prefix) || message.author.bot) return;
      const commandfile =
        client.commands.get(cmd.slice(prefix.length)) ||
        bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));

      commandfile.execute(client, message, args);
    }
  },
};
