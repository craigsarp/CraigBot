const mongoose = require('mongoose');

let Schema = new mongoose.Scheme({
  Guild: String,
  Prefix: String,
});

module.exports = mongoose.model('prefix', Schema)
