const mongoose = require('mongoose');

// Represents a course from learning platforms (Coursera/Udemy) - seeded dataset
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, enum: ['Coursera', 'Udemy', 'edX', 'YouTube'], default: 'Coursera' },
  url: { type: String, default: '' },
  skill_tag: { type: String, required: true }, // the skill this course teaches (normalized)
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  duration_hours: { type: Number, default: 10 },
  rating: { type: Number, default: 4.5 }
});

module.exports = mongoose.model('Course', courseSchema);
