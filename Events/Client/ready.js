const { Client } = require("discord.js");
const config = require("../../Structures/config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,

  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log("The client is now ready!");

    // Bot status Activity
    client.user.setActivity("serah lo dah ah!!", { type: "WATCHING" });

    if (!config.DatabaseUrl) return;
    mongoose
      .connect(config.DatabaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("The client is now connected to database!");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
