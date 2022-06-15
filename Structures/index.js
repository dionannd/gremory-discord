const { Client, Collection } = require("discord.js");
const client = new Client({
  intents: 32767,
});
const config = require("./config.json");

client.commands = new Collection();
client.voiceGenerator = new Collection();

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(config.Token);
