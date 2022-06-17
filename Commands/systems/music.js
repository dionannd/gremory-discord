const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "music",
  description: "Musik sistem komplit",
  options: [
    {
      name: "play",
      description: "Putar musik.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "query",
          description: "Tuliskan nama musik atau url musik",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "volume",
      description: "Kontrol volume musik",
      type: "SUB_COMMAND",
      options: [
        {
          name: "percent",
          description: "10 = 10%",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
      name: "settings",
      description: "Pilih opsi.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "options",
          description: "Pilih opsi",
          type: "STRING",
          required: true,
          choices: [
            { name: "queu", value: "queu" },
            { name: "skip", value: "skip" },
            { name: "pause", value: "pause" },
            { name: "resume", value: "resume" },
            { name: "stop", value: "stop" },
          ],
        },
      ],
    },
  ],

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;

    if (!VoiceChannel)
      return interaction.reply({
        content:
          "Kamu harus berada di voice channel untuk bisa menggunakan musuc command",
      });
  },
};
