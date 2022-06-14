const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "voice",
  description: "Kontrol channel yang kamu miliki",
  options: [
    {
      name: "invite",
      type: "SUB_COMMAND",
      description: "Undang teman kamu ke channel kamu",
      options: [
        {
          name: "member",
          type: "USER",
          require: true,
          description: "Pilih anggota untuk diundang",
        },
      ],
    },
    {
      name: "disallow",
      type: "SUB_COMMAND",
      description: "Tendang seseorang dari channel",
      options: [
        {
          name: "member",
          type: "USER",
          require: true,
          description: "Pilih anggota untuk ditendang",
        },
      ],
    },
    {
      name: "name",
      type: "SUB_COMMAND",
      description: "Ubah nama channel kamu",
      options: [
        {
          name: "text",
          type: "STRING",
          require: true,
          description: "Tuliskan nama channel",
        },
      ],
    },
    {
      name: "public",
      type: "SUB_COMMAND",
      description: "Ubah channel ke pulic untuk semua orang",
      options: [
        {
          name: "turn",
          type: "STRING",
          require: true,
          description: "Pilih On atau Off",
          choices: [
            { name: "On", value: "On" },
            { name: "Off", value: "Off" },
          ],
        },
      ],
    },
  ],

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {*} client
   */
  async execute(interaction, client) {
    const { options, member, guild } = interaction;

    const subCommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const Embed = new MessageEmbed().setColor("BLUE");
    const ownedChannel = client.voiceGenerator.get(member.id);

    if (!voiceChannel)
      return interaction.reply({
        embeds: [
          Embed.setDescription("Kamu tidak sedang di voice channel.").setColor(
            "RED"
          ),
        ],
        ephemeral: true,
      });

    if (!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({
        embeds: [
          Embed.setDescription(
            "Kamu tidak memiliki channel ini atau channel mana pun."
          ).setColor("RED"),
        ],
        ephemeral: true,
      });

    switch (subCommand) {
      case "name":
        {
          const newName = options.getString("text");
          if (newName.length > 22 || newName.length < 1)
            return interaction.reply({
              embeds: [
                Embed.setDescription(
                  "Nama tidak boleh lebih dari 22 karakter."
                ).setColor("RED"),
              ],
              ephemeral: true,
            });

          voiceChannel.edit({ name: newName });
          interaction.reply({
            embeds: [
              Embed.setDescription(`Nama Channel berubah menjadi ${newName}`),
            ],
            ephemeral: true,
          });
        }
        break;
      case "invite":
        {
          const targetMember = options.getMember("member");
          voiceChannel.permissionOverwrites.edit(targetMember, {
            CONNECT: true,
          });

          targetMember.send({
            embeds: [
              Embed.setDescription(
                `${member} mengundang kamu ke channel <#${voiceChannel.id}>`
              ),
            ],
          });
          interaction.reply({
            embeds: [
              Embed.setDescription(`${targetMember} sudah diundang ke channel`),
            ],
          });
        }
        break;
      case "disallow":
        {
          const targetMember = options.getMember("member");
          voiceChannel.permissionOverwrites.edit(targetMember, {
            CONNECT: false,
          });

          if (
            targetMember.voice.channel &&
            targetMember.voice.channel.id == voiceChannel.id
          )
            targetMember.voice.setChannel(null);
          interaction.reply({
            embeds: [
              Embed.setDescription(
                `${targetMember} sudah di tendang dari channel`
              ),
            ],
            ephemeral: true,
          });
        }
        break;
      case "public": {
        const turnChoice = options.getString("turn");
        switch (turnChoice) {
          case "On":
            {
              voiceChannel.permissionOverwrites.edit(guild.id, {
                CONNECT: null,
              });
              interaction.reply({
                embeds: [
                  Embed.setDescription("Channel berubah menjadi Public"),
                ],
                ephemeral: true,
              });
            }
            break;
          case "Off":
            {
              voiceChannel.permissionOverwrites.edit(guild.id, {
                CONNECT: false,
              });
              interaction.reply({
                embeds: [
                  Embed.setDescription("Channel berubah menjadi Private"),
                ],
                ephemeral: true,
              });
            }
            break;
        }
      }
    }
  },
};