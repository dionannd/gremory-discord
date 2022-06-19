const client = require("../../../index");
const { MessageEmbed } = require("discord.js");
const gif =
  "https://raw.githubusercontent.com/dionannd/gremory-discord/main/src/assets/music.gif";

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "Semua antrian"
        : "Lagu ini"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
  .on("playSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `🎶 | Memutar \`${song.name}\` - \`${
              song.formattedDuration
            }\`\n Permintaan: ${song.user}\n${status(queue)}`
          ),
      ],
    })
  )

  .on("addSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `🎶 | ${song.name} - \`${song.formattedDuration}\` Ditambahkan ke antrian oleh: ${song.user}`
          ),
      ],
    })
  )

  .on("addList", (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `🎶 | Ditambahkan \`${playlist.name}\` playlist (${
              playlist.songs.length
            } lagu) ke antrian\n${status(queue)}`
          ),
      ],
    })
  )

  .on("error", (channel, e) => {
    channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `⛔ | Terjadi kesalahan: ${e.toString().slice(0, 1974)}`
          ),
      ],
    });
  })

  .on("empty", (queue) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription("Voice channel kosong! keluar dari channel..."),
      ],
    })
  )

  .on("searchNoResult", (message, query) =>
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `⛔ | Tidak ada hasil yang ditemukan untuk \`${query}\`!`
          ),
      ],
    })
  )

  .on("finish", (queue) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription("Antrian selesai! keluar dari channel..."),
      ],
    })
  );
