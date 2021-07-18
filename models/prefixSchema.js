const mongoose = require('mongoose');
 
const prefixSchema = new mongoose.Schema({
    guildID: { type: String },
    prefix: { type: String }
})
