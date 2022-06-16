const { Client, Collection } = require("discord.js");
const { Token } = require("./config.json");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

const client = new Client({
  intents: 32767,
});

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});

client.commands = new Collection();
client.voiceGenerator = new Collection();

module.exports = client;

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(Token);
