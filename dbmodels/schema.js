const mongoose = require('mongoose');

const DTCSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  coordinates: {
    type: Array,
  },
  vehicle: {
    type: String,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('DTC', DTCSchema);