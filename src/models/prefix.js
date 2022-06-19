const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
  prefix: {
    type: String,
  },
  guildId: String,
});

const MessageModel = (module.exports = mongoose.model(
  "prefixes",
  PrefixSchema
));
