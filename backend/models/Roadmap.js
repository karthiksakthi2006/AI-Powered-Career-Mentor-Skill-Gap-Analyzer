const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobRole', required: true },
  target_role_title: { type: String },
  matched_skills: [{ type: String }],
  missing_skills: [{ type: String }],
  readiness_score: { type: Number, default: 0 }, // 0-100
  recommended_courses: [
    {
      skill: String,
      course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      title: String,
      platform: String,
      url: String
    }
  ],
  status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
