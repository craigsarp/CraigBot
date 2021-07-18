const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Prefix: String,
    GuildID: String
});

const MessageModel = module.exports = mongoose.model('prefixes', Schema);
