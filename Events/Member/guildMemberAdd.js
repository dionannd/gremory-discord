const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",

  /**
   *
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    member.roles.add(process.env.ROLES_ID); // Add custom role for new member

    // from Webhook url
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
      Selamat daang ${member} di **${guild.name}**!
      \n Akun Dibuat Pada: <t:${parseInt(user.createdTimestamp / 1000)}:R>
      \n Jumlah Anggota Terbaru: **${guild.memberCount}**
    `
      )
      .setFooter({ text: `ID: ${user.id}` });

    Welcomer.send({ embeds: [Welcome] });
  },
};
