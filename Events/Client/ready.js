const { Client } = require("discord.js");
const { DATABASE } = require("../../config.json");
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
    client.user.setActivity("Fak this shit i'm out!", { type: "WATCHING" });

    if (!DATABASE) return;
    mongoose
      .connect(DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("The client is now connected to the database!");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
