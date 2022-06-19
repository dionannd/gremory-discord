const MessageModel = require("../../models/prefix");

module.exports = {
  name: "setprefix",
  description: "change prefix command",
  permission: "ADMINISTRATOR",
  aliases: [],

  async execute(bot, message, args) {
    const data = await MessageModel.findOne({
      guildIg: message.guild.id,
    });

    if (!args[0])
      return message.channel.send("You must provide a **new prefix**!");

    if (args[0].length > 5)
      return message.channel.send(
        "Your new prefix must be under `5` characters!"
      );

    if (data) {
      await MessageModel.findOneAndRemove({
        guildId: message.guild.id,
      });

      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new MessageModel({
        prefix: args[0],
        guildIg: message.guild.id,
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new MessageModel({
        prefix: args[0],
        guildId: message.guild.id,
      });
      newData.save();
    }
  },
};
