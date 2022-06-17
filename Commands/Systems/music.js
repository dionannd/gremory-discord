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
          description: "Tuliskan nama musik atau link url musik",
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
        ephemeral: true,
      });

    if (
      guild.me.voice.channelId &&
      VoiceChannel.id !== guild.me.voice.channelId
    )
      return interaction.reply({
        content: `Aku sudah memutar musik di <#${guild.me.voice.channelId}>.`,
        ephemeral: true,
      });

    try {
      switch (options.getSubcommand()) {
        case "play": {
          client.distube.play(VoiceChannel, options.getString("query"), {
            textChannel: channel,
            member: member,
          });
          return interaction.reply({ content: "Permintaan diterima." });
        }
        case "volume": {
          const Volume = options.getNumber("percent");
          if (Volume > 100 || Volume < 1)
            return interaction.reply({
              content: "Kamu harus menentukan angka antara 1 dan 100.",
            });

          client.distube.setVolume(VoiceChannel, Volume);
          return interaction.reply({
            content: `Volume sudah diatur menjadi \`${Volume}%\``,
          });
        }
        case "settings": {
          const queue = await client.distube.getQueue(VoiceChannel);

          if (!queue)
            return interaction.reply({ content: "⛔ Tidak ada antrian." });

          switch (options.getString("options")) {
            case "skip":
              await queue.skip(VoiceChannel);
              return interaction.reply({ content: "⏭️ Lagu sudah diskip." });
            case "stop":
              await queue.stop(VoiceChannel);
              return interaction.reply({
                content: "⏹️ Musik sudah berhenti.",
              });
            case "pause":
              await queue.pause(VoiceChannel);
              return interaction.reply({ content: "⏸️ Lagu sudah dijeda." });
            case "resume":
              await queue.resume(VoiceChannel);
              return interaction.reply({
                content: "⏸️ Lagu sudah dilanjutkan.",
              });
            case "queue":
              return interaction.reply({
                embeds: [
                  new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(
                      `${queu.songs.map(
                        (song, id) =>
                          `\n**${id + 1}**. ${song.name} - \`${
                            song.formattedDuration
                          }\``
                      )}`
                    ),
                ],
              });
          }
          return;
        }
      }
    } catch (error) {
      const errorMessage = new MessageEmbed()
        .setColor("RED")
        .setDescription(`⛔ Peringatan: ${error}`);
      return interaction.reply({ embeds: [errorMessage] });
    }
  },
};
