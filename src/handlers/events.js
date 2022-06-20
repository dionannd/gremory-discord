const { Events } = require("../validations/eventNames");

module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Memuat Events");

  (await PG(`${process.cwd()}/src/events/*/*.js`)).map(async (file) => {
    const event = require(file);

    if (!Events.includes(event.name) || !event.name) {
      const L = file.split("/");

      Table.addRow(
        `${event.name || "❎ error"}`,
        `Nama event tidak valid: ${L[L.length - 2]}/${L[L.length - 1]}`
      );
      return;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    Table.addRow(event.name, "✅");
  });

  console.log(Table.toString());
};
