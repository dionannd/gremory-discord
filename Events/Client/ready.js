const { Client } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,

  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log("Klien sudah siap dijalankan!");

    if (!process.env.DATABASE_URL) return;
    mongoose
      .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Klien sudah terhubung ke database!");
      })
      .catch((err) => {
        console.log(err);
      });

    // Bot status Activity
    client.user.setActivity("serah lo dah ah!!", { type: "WATCHING" });
    // client.user.setActivity("Maintenance dulu YGY!!", { type: "PLAYING" });
  },
};
