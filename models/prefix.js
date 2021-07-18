const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Prefix: String,
    guildID: String
});

const MessageModel = module.exports = mongoose.model('prefixes', Schema);
