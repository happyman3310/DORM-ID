// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  coins: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement',
    },
  ],
  biography: {
    type: String,
    default: '',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dashboardSettings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DashboardSettings',
    default: null,
  },
});

module.exports = mongoose.model('User', UserSchema);