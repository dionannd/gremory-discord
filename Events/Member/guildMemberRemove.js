const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   *
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    // from Webhook url
    const Loger = new WebhookClient({
      id: "986831352026517604",
      token:
        "1A2buPqAwLF9h3YtNr3gRRjPBtxL314LCS8BuFdJE68OoLPmIIt-8ygtYAGhRAmqUtvx",
    });

    const Welcome = new MessageEmbed()
      .setColor("RED")
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `
      ${member} has left from the server\n
      Joined: <t:${parseInt(
        member.joinedTimestamp / 1000
      )}:R>\nLatest Member Count: **${guild.memberCount}**`
      )
      .setFooter({ text: `ID: ${user.id}` });

    Loger.send({ embeds: [Welcome] });
  },
};
