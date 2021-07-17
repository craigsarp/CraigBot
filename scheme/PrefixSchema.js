const mongoose = require('mongoose');

const PrefixScheme = mongooes.Scheme(
  _id: {
    type: String, 
    require: true
  },
  newPrefix: {
    type: String,
    require: true
  }
)

const model = mongoose.model("Prefixes", PrefixSchema)

module.exports = model;
