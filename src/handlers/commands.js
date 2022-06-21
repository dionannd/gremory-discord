const { Perms } = require("../validations/permissions");
const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Memuat Command");

  CommandsArray = [];

  (await PG(`${process.cwd().replace(/\\/g, "/")}/src/commands/*/*.js`)).map(
    async (file) => {
      const command = require(file);

      if (!command.name)
        return Table.addRow(
          file.split("/")[7],
          "⚠️",
          "⛔ ⟬Name tidak ditemukan.⟭"
        );

      if (!command.context && !command.description)
        return Table.addRow(
          command.name,
          "⚠️",
          "⛔ ⟬Description tidak ditemukan.⟭"
        );

      if (command.permission) {
        if (Perms.includes(command.permission))
          command.defaultPermission = false;
        else
          return Table.addRow(
            command.name,
            "⚠️",
            "⛔ ⟬Permission tidak valid.⟭"
          );
      }

      client.commands.set(command.name, command);
      CommandsArray.push(command);

      await Table.addRow(command.name, "✅");
    }
  );

  console.log(Table.toString());

  client.on("ready", async () => {
    const mainGuild = client.guilds.cache.get(process.env.SERVER_ID);

    await mainGuild.commands.set(CommandsArray);
  });
};
