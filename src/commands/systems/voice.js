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
          name: "country",
          type: "STRING",
          required: true,
          description: "Pilih region yang tersedia.",
          choices: [
            { name: "Automatic", value: "null" },
            { name: "🇧🇷 Brazil", value: "brazil" },
            { name: "🇭🇰 Hong Kong", value: "hongkong" },
            { name: "🇮🇳 India", value: "india" },
            { name: "🇯🇵 Japan", value: "japan" },
            { name: "🇳🇱 Rotterdam", value: "rotterdam" },
            { name: "🇷🇺 Russia", value: "russia" },
            { name: "🇸🇬 Singapore", value: "singapore" },
            { name: "🇰🇷 South Korea", value: "south-korea" },
            { name: "🇿🇦 South Afrika", value: "southafrica" },
            { name: "🇦🇺 Sydney", value: "sydney" },
            { name: "🇺🇳 US Central", value: "us-central" },
            { name: "🇺🇳 US East", value: "us-east" },
            { name: "🇺🇳 US South", value: "us-south" },
            { name: "🇺🇳 US West", value: "us-west" },
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
          const changeCountry = options.getString("country");
          switch (changeCountry) {
            case "null":
              {
                voiceChannel.setRTCRegion(null);
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: Automatic."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "brazil":
              {
                voiceChannel.setRTCRegion("brazil");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇧🇷 Brazil."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "hongkong":
              {
                voiceChannel.setRTCRegion("hongkong");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇭🇰 Hong Kong."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "india":
              {
                voiceChannel.setRTCRegion("india");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇮🇳 India."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "japan":
              {
                voiceChannel.setRTCRegion("japan");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇯🇵 Japan."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "rotterdam":
              {
                voiceChannel.setRTCRegion("rotterdam");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇳🇱 Rotterdam."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "russia":
              {
                voiceChannel.setRTCRegion("russia");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇷🇺 Russia."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "singapore":
              {
                voiceChannel.setRTCRegion("singapore");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇸🇬 Singapore."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "south-korea":
              {
                voiceChannel.setRTCRegion("south-korea");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇰🇷 South Korea."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "southafrica":
              {
                voiceChannel.setRTCRegion("southafrica");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇿🇦 South Afrika."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "sydney":
              {
                voiceChannel.setRTCRegion("sydney");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇦🇺 Sydney."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "us-central":
              {
                voiceChannel.setRTCRegion("us-central");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇺🇳 US Central."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "us-east":
              {
                voiceChannel.setRTCRegion("us-east");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇺🇳 US East."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "us-south":
              {
                voiceChannel.setRTCRegion("us-south");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇺🇳 US South."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "us-west":
              {
                voiceChannel.setRTCRegion("us-west");
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      "Region channel sudah diatur menjadi: 🇺🇳 US West."
                    ),
                  ],
                  ephemeral: true,
                });
              }
              break;
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
                    Embed.setDescription(
                      "🔓 Channel terbuka untuk semua orang ."
                    ),
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
                    Embed.setDescription(
                      "🔒 Channel sudah ditutup untuk beberapa orang."
                    ),
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
