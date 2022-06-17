require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.commands = new Collection();
client.voiceGenerator = new Collection();

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});

module.exports = client;

// require("./Structures/Handlers/Events")(client);
// require("./Structures/Handlers/Commands")(client);

client.login(process.env.TOKEN);
