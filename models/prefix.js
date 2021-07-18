const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    prefix: String,
    guildID: String
});

const MessageModel = module.exports = mongoose.model('prefixes', Schema);
