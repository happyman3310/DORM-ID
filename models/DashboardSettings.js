// backend/models/DashboardSettings.js
const mongoose = require('mongoose');

const DashboardSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  widgets: [
    {
      widgetId: {
        type: String,
        required: true,
      },
      position: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      },
    },
  ],
});

module.exports = mongoose.model('DashboardSettings', DashboardSettingsSchema);