const { Client } = require("discord.js");
const { DatabaseUrl } = require("../../Structures/config.json");
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

    if (!DatabaseUrl) return;
    mongoose
      .connect(DatabaseUrl, {
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
  },
};
