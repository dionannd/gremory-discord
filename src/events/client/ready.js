const { Client } = require("discord.js");
const { PREFIX } = require("../../data/config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,

  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log("Klien login sebagai " + client.user.tag);
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
    client.user.setActivity(`Your Heart❤️`, {
      type: "PLAYING",
    });
    // client.user.setActivity("Maintenance dulu YGY!!", { type: "PLAYING" });
  },
};
