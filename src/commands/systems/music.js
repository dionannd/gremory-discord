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
            { name: "🔢 Lihat Antrian", value: "queue" },
            { name: "⏭️ Skip Lagu", value: "skip" },
            { name: "⏸️ Jeda Lagu", value: "pause" },
            { name: "⏯️ Lanjutkan Lagu", value: "resume" },
            { name: "⏹️ Stop Musik", value: "stop" },
            { name: "🔀 Acak Antrian", value: "shuffle" },
            { name: "🔃 Mmode Putar Otomatis", value: "autoPlay" },
            { name: "🆕 Tambahkan Lagu Terkait", value: "relatedSong" },
            { name: "🔃 Mode Pengulangan", value: "repeatMode" },
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
        content: `Aku sedang memutar musik di channel <#${guild.me.voice.channelId}>.`,
        ephemeral: true,
      });

    try {
      switch (options.getSubcommand()) {
        case "play": {
          client.distube.play(VoiceChannel, options.getString("query"), {
            textChannel: channel,
            member: member,
          });
          return interaction.reply({
            content: "🗒️Permintaan diterima, sedang mencari lagu.",
          });
        }
        case "volume": {
          const Volume = options.getNumber("percent");
          if (Volume > 100 || Volume < 1)
            return interaction.reply({
              content: "Kamu harus menentukan angka antara 1 dan 100.",
            });

          client.distube.setVolume(VoiceChannel, Volume);
          return interaction.reply({
            content: `📶 Volume sudah diatur menjadi \`${Volume}%\``,
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
                content: "⏹️ Musik sudah dihentikan.",
              });

            case "pause":
              await queue.pause(VoiceChannel);
              return interaction.reply({ content: "⏸️ Lagu sudah dijeda." });

            case "resume":
              await queue.resume(VoiceChannel);
              return interaction.reply({
                content: "⏸️ Lagu sudah dilanjutkan.",
              });

            case "shuffle":
              await queue.shuffle(VoiceChannel);
              return interaction.reply({
                content: "🔀 Antrian sudah diacak.",
              });

            case "autoPlay":
              let Mode = await queue.toggleAutoplay(VoiceChannel);
              return interaction.reply({
                content: `🔃 Mode otomatis sudah diatur ke: ${
                  Mode ? "On" : "Off"
                }.`,
              });

            case "relatedSong":
              await queue.addRelatedSong(VoiceChannel);
              return interaction.reply({
                content: "🆕 lagu terkait telah ditambahkan ke antrian.",
              });

            case "repeatMode":
              let ModeRepeat = await client.distube.setRepeatMode(queue);
              return interaction.reply({
                content: `🔃 Mode ulangi sudah diatur ke: ${(ModeRepeat =
                  ModeRepeat
                    ? ModeRepeat == 2
                      ? "Antrian"
                      : "Lagu"
                    : "Off")}.`,
              });

            case "queue":
              return interaction.reply({
                embeds: [
                  new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(
                      `${queue.songs.map(
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
