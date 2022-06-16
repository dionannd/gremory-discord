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
        {
          name: "Command",
          value: "Command",
        },
        {
          name: "Event",
          value: "Event",
        },
        {
          name: "System",
          value: "System",
        },
      ],
    },
    {
      name: "name",
      description: "Tuliskan nama untuk saran anda.",
      type: "STRING",
      required: true,
    },
    {
      name: "function",
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
    const func = options.getString("function");

    const Response = new MessageEmbed()
      .setColor("AQUA")
      .setDescription(`${interaction.member} telah menyarankan ${type}`)
      .addField("Nama", `${name}`, true)
      .addField("Fungsi", `${func}`, true);

    const message = await interaction.reply({
      embeds: [Response],
      fetchReply: true,
    });
    message.react("🟢");
    message.react("🔴");
  },
};
