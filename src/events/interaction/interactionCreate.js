const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command)
        return (
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ Bermasalah saat menjalankan command ini."),
            ],
          }) && client.commands.delete(interaction.commandName)
        );

      if (
        command.permission &&
        !interaction.member.permissions.has(command.permission)
      ) {
        return interaction
          .reply({
            content: `⛔ Kamu tidak punya akses untuk menjalankan perintah ini: \`${interaction.commandName}\`.`,
            ephemeral: true,
          })
          .then((sent) =>
            setTimeout(() => {
              sent.delete();
            }, 3000)
          );
      }

      command.execute(interaction, client);
    }
  },
};
