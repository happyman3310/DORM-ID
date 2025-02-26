// backend/models/Achievement.js
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  xpRequired: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Achievement', AchievementSchema);