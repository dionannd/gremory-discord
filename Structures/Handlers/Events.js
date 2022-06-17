const { Events } = require("../Validation/eventNames");

module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Memuat Events");

  (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
    const event = require(file);

    if (!Events.includes(event.name) || !event.name) {
      const L = file.split("/");

      Table.addRow(
        `${event.name || "❎ TIDAK DITEMUKAN"}`,
        `Nama event tidak valid atau tidak ditemukan: ${L[6] + `/` + L[7]}`
      );
      return;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    Table.addRow(event.name, "✅ BERHASIL");
  });

  console.log(Table.toString());
};
