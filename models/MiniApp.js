// backend/models/MiniApp.js
const mongoose = require('mongoose');

const MiniAppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('MiniApp', MiniAppSchema);