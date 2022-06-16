const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");
const { rolesId } = require("../../Structures/config.json");

module.exports = {
  name: "guildMemberAdd",

  /**
   *
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    member.roles.add(rolesId);

    const Welcomer = new WebhookClient({
      id: "986735451404664852",
      token:
        "6uWXsj2RmE-Uxqhd2yqxCA4EBwDpPbRkQtmZyBsBEKxgYEPJqgV7E6qVekRCGWEeIrzh",
    });

    const Welcome = new MessageEmbed()
      .setColor("AQUA")
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `
      Welcome ${member} to the **${guild.name}**!\n
      Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
      Latest Member Count: **${guild.memberCount}**
    `
      )
      .setFooter({ text: `ID: ${user.id}` });

    Welcomer.send({ embeds: [Welcome] });
  },
};
