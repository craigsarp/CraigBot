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
