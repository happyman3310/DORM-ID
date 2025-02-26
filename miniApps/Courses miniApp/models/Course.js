// backend/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [String],
      correctAnswer: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Course', CourseSchema);