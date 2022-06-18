require("dotenv").config();
const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const Ascii = require("ascii-table");
const PG = promisify(glob);

const client = new Client({ intents: 32767 });

client.commands = new Collection();
client.voiceGenerator = new Collection();

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
  youtubeDL: false,
});

module.exports = client;

["events", "commands"].forEach((handler) => {
  require(`./src/handlers/${handler}`)(client, PG, Ascii);
});

client.login(process.env.TOKEN);
