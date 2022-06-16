const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Buat saran dalam hal terorganisir.",
  options: [
    {
      name: "type",
      type: "STRING",
      description: "Pilih tipenya.",
      required: true,
      choices: [
        { name: "Command", value: "command" },
        { name: "Event", value: "event" },
        { name: "System", value: "system" },
      ],
    },
    {
      name: "name",
      description: "Tuliskan nama untuk saran anda.",
      type: "STRING",
      required: true,
    },
    {
      name: "functionality",
      description: "Jelaskan fungsi dari saran ini.",
      type: "STRING",
      required: true,
    },
  ],

  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { options } = interaction;

    const type = options.getString("type");
    const name = options.getString("name");
    const func = options.getString("functionality");

    const Response = new MessageEmbed()
      .setColor("AQUA")
      .setDescription(`${interaction.member} telah menyarankan ${type}`)
      .addField("Nama", `${name}`)
      .addField("Fungsi", `${func}`, true);

    const message = await interaction.reply({
      embeds: [Response],
      fetchReply: true,
    });
    message.react("🟢");
    message.react("🔴");
  },
};
