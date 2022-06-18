const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "voice",
  description: "Kontrol channel yang kamu miliki",
  options: [
    {
      name: "invite",
      type: "SUB_COMMAND",
      description: "Undang teman ke channel kamu.",
      options: [
        {
          name: "member",
          type: "USER",
          require: true,
          description: "Pilih member.",
        },
      ],
    },
    {
      name: "kick",
      type: "SUB_COMMAND",
      description: "Kick seseorang dari channel.",
      options: [
        {
          name: "member",
          type: "USER",
          require: true,
          description: "Pilih member.",
        },
      ],
    },
    {
      name: "name",
      type: "SUB_COMMAND",
      description: "Ubah nama channel kamu.",
      options: [
        {
          name: "text",
          type: "STRING",
          require: true,
          description: "Tuliskan nama channel.",
        },
      ],
    },
    {
      name: "public",
      type: "SUB_COMMAND",
      description: "Ubah channel ke pulic untuk semua orang.",
      options: [
        {
          name: "turn",
          type: "STRING",
          require: true,
          description: "Pilih On atau Off",
          choices: [
            { name: "On", value: "on" },
            { name: "Off", value: "off" },
          ],
        },
      ],
    },
    {
      name: "limit",
      type: "SUB_COMMAND",
      description: "Ubah maksimal isi channel.",
      options: [
        {
          name: "number",
          type: "NUMBER",
          require: true,
          description: "Isi angka 0-99, 0 = tidak terbatas.",
        },
      ],
    },
    {
      name: "region",
      type: "SUB_COMMAND",
      description: "Ubah region voice channel.",
      options: [
        {
          name: "name",
          type: "STRING",
          required: true,
          description:
            "Tuliskan nama region, ex: brazil / us-central, auto = automatically .",
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
    const Embed = new MessageEmbed().setColor("GREEN");
    const ownedChannel = client.voiceGenerator.get(member.id);

    if (!voiceChannel)
      return interaction.reply({
        embeds: [
          Embed.setDescription(
            "Kamu tidak sedang berada di voice channel."
          ).setColor("RED"),
        ],
        ephemeral: true,
      });

    if (!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({
        embeds: [
          Embed.setDescription(
            "Kamu tidak memiliki channel ini, atau channel mana pun."
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
              Embed.setDescription(`Nama channel berubah menjadi ${newName}.`),
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

          await targetMember.send({
            embeds: [
              Embed.setDescription(
                `${member} mengundang kamu ke channel <#${voiceChannel.id}>.`
              ),
            ],
          });
          interaction.reply({
            embeds: [
              Embed.setDescription(
                `${targetMember} sudah diundang ke channel.`
              ),
            ],
            ephemeral: true,
          });
        }
        break;
      case "kick":
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
                `${targetMember} sudah di kick dari channel.`
              ),
            ],
            ephemeral: true,
          });
        }
        break;
      case "limit":
        {
          const newLimit = options.getNumber("number");

          if (newLimit > 99)
            return interaction.reply({
              embeds: [
                Embed.setDescription(
                  "Limit tidak boleh lebih dari 99."
                ).setColor("RED"),
              ],
              ephemeral: true,
            });

          if (newLimit < 1) {
            voiceChannel.setUserLimit(0);
            interaction.reply({
              embeds: [
                Embed.setDescription(
                  `limit channel berubah menjadi tidak terbatas.`
                ),
              ],
              ephemeral: true,
            });
          } else {
            voiceChannel.setUserLimit(newLimit);
            interaction.reply({
              embeds: [
                Embed.setDescription(
                  `limit channel berubah menjadi: ${newLimit} orang.`
                ),
              ],
              ephemeral: true,
            });
          }
        }
        break;
      case "region":
        {
          const newRegion = options.getString("name");

          if (newRegion > 15 || newRegion < 4)
            return interaction.reply({
              embeds: [
                Embed.setDescription(
                  `Tidak boleh kurang dari 4 atau lebih dari 15 karakter`
                ),
              ],
            });

          if (newRegion === "hong-kong") {
            voiceChannel.setRTCRegion("hongkong");
          } else if (newRegion === "singapur") {
            voiceChannel.setRTCRegion("singapore");
          } else if (
            newRegion === "jepang" ||
            newRegion === "jav" ||
            newRegion === "wibu"
          ) {
            voiceChannel.setRTCRegion("japan");
          } else if (newRegion === "uscentral") {
            voiceChannel.setRTCRegion("us-central");
          } else if (
            newRegion === "useast" ||
            newRegion === "us-timur" ||
            newRegion === "ustimur" ||
            newRegion === "us timur"
          ) {
            voiceChannel.setRTCRegion("us-east");
          } else if (
            newRegion === "ussouth" ||
            newRegion === "us-selatan" ||
            newRegion === "usselatan" ||
            newRegion === "us selatan"
          ) {
            voiceChannel.setRTCRegion("us-south");
          } else if (
            newRegion === "uswest" ||
            newRegion === "us-barat" ||
            newRegion === "usbarat" ||
            newRegion === "us barat"
          ) {
            voiceChannel.setRTCRegion("us-west");
          } else if (
            newRegion === "south-africa" ||
            newRegion === "south afrika" ||
            newRegion === "south africa" ||
            newRegion === "afrika-selatan" ||
            newRegion === "afrika selatan"
          ) {
            voiceChannel.setRTCRegion("southafrica");
          } else if (
            newRegion === "southkorea" ||
            newRegion === "south korea" ||
            newRegion === "korsel" ||
            newRegion === "korea selatan" ||
            newRegion === "korea-selatan"
          ) {
            voiceChannel.setRTCRegion("south-korea");
          }

          const changeRegion = voiceChannel.setRTCRegion(newRegion);

          interaction.reply({
            embeds: [
              Embed.setDescription(
                `Region channel berubah menjadi: ${newRegion}.`
              ),
            ],
            ephemeral: true,
          });

          if (newRegion === "auto") {
            voiceChannel.setRTCRegion(null);

            interaction.reply({
              embeds: [
                Embed.setDescription(
                  `Region channel berubah menjadi: automatic.`
                ),
              ],
              ephemeral: true,
            });
          }

          if (!changeRegion) {
            voiceChannel.setRTCRegion(null);
            interaction.reply({
              embeds: [
                Embed.setDescription(
                  `Region tidak ditemukan, berubah mendajadi: automatic.`
                ),
              ],
              ephemeral: true,
            });
          }
        }
        break;
      case "public":
        {
          const turnChoice = options.getString("turn");
          switch (turnChoice) {
            case "on":
              {
                voiceChannel.permissionOverwrites.edit(guild.id, {
                  CONNECT: null,
                });
                interaction.reply({
                  embeds: [
                    Embed.setDescription("Channel berubah menjadi Public."),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "off":
              {
                voiceChannel.permissionOverwrites.edit(guild.id, {
                  CONNECT: false,
                });
                interaction.reply({
                  embeds: [
                    Embed.setDescription("Channel berubah menjadi Private."),
                  ],
                  ephemeral: true,
                });
              }
              break;
          }
        }
        break;
    }
  },
};