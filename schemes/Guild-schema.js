const mongoose = require('mongoose');

const guildScheme = mongoose.Schema({
guildId: {
type: String,
 required: true,
},
prefix: {
type: String,
},
});

module.exports = mongoose.model(`guild-settings`, guildSchema);
