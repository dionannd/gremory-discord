const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Menghapus sejumlah pesan tertentu dari channel atau target.",
  permissions: "MANAGE_MESSAGES",
  options: [
    {
      name: "amount",
      description:
        "Pilih jumlah pesan yang akan dihapus dari channel atau target.",
      type: "NUMBER",
      required: true,
    },
    {
      name: "target",
      description: "Pilih target untuk menghapus pesan mereka.",
      type: "USER",
      required: false,
    },
  ],

  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, options } = interaction;

    const Amount = options.getNumber("amount");
    const Target = options.getMember("target");

    const Messages = await channel.messages.fetch();

    const Response = new MessageEmbed().setColor("LUMINOUS_VIVID_PINK");

    if (Target) {
      let i = 0;
      const filtered = [];

      (await Messages).filter((m) => {
        if (m.author.id === Target.id && Amount > i) {
          filtered.push(m);
          i++;
        }
      });

      await channel.bulkDelete(filtered, true).then((messages) => {
        Response.setDescription(
          `🧹 Membersihkan ${messages.size} pesan dari ${Target}.`
        );
        interaction.reply({ embeds: [Response] });
      });
    } else {
      await channel.bulkDelete(Amount, true).then((messages) => {
        Response.setDescription(
          `🧹 Membersihkan ${messages.size} pesan dari channel ini.`
        );
        interaction.reply({ embeds: [Response] });
      });
    }
  },
};
