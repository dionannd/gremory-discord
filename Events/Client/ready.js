const { Client } = require("discord.js");
const { DATABASE } = require("../../Structures/config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,

  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log("Client sudah siap!");
    client.user.setActivity("serah lo dah ah!", { type: "WATCHING" });

    if (!DATABASE) return;
    mongoose
      .connect(DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Client sudah terhubung ke database!");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
