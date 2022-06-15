const { Client } = require("discord.js");
const config = require("../../config.json");
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

    if (!config.DatabaseUrl) return;
    mongoose
      .connect(config.DatabaseUrl, {
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
