const { Client, Message } = require("discord.js");
const { PREFIX } = require("../../data/config.json");

module.exports = {
  name: "messageCreate",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  async execute(client, message) {
    if (!message.guild || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    if (cmdName.length == 0) return;

    const command =
      client.commands.get(cmdName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(cmdName)
      );

    if (!command) return;

    if (command.permission) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.permission)) {
        const NoPerms = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `Kamu tidak memiliki akses untuk menjalankan perintah ini`
          );
        message.reply({ embeds: [NoPerms] }).then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2000);
        });
      }
    }

    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownsAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime =
        timestamps.get(message.author.id) + cooldownsAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const timeLeftEmbed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `Harap tunggu ${timeLeft.toFixed(
              1
            )} detik untuk menjalankan perintah ini lagi!`
          );

        return message.channel
          .send({ embeds: [timeLeftEmbed] })
          .then((sent) => {
            setTimeout(() => {
              sent.delete;
            }, 2000);
          });
      }
    }

    timestamps.set(message.author.id, now);

    try {
      command.execute(message, args, client);
    } catch (error) {
      console.log(error);
      const errorEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          `Terjadi kesalahan saat menjalankan perintah ini, periksa konsol untuk lebih jelasnya.`
        );
      message.channel.send({ embeds: [errorEmbed] });
    }
  },
};
