const mongoose = require('mongoose');

// One document per user, holding their full skill set + resume text
const skillProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  skills: [
    {
      skill_name: { type: String, required: true },
      skill_level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
      verified: { type: Boolean, default: false } // true if extracted/confirmed from resume
    }
  ],
  resume_text: { type: String, default: '' },
  target_role: { type: String, default: '' },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SkillProfile', skillProfileSchema);
