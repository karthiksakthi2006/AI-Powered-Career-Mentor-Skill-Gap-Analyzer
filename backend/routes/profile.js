const express = require('express');
const router = express.Router();

const SkillProfile = require('../models/SkillProfile');
const authMiddleware = require('../utils/authMiddleware');
const { extractSkillsFromText } = require('../utils/resumeParser');

// GET /api/profile - get current user's skill profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await SkillProfile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found.' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// PUT /api/profile/skills - manually update skills list
router.put('/skills', authMiddleware, async (req, res) => {
  try {
    const { skills, target_role } = req.body; // skills: [{ skill_name, skill_level }]

    const profile = await SkillProfile.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $set: {
          skills: skills || [],
          target_role: target_role || '',
          updated_at: new Date()
        }
      },
      { new: true, upsert: true }
    );

    res.json({ message: 'Profile updated.', profile });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// POST /api/profile/resume - submit resume text, extract skills via NLP
router.post('/resume', authMiddleware, async (req, res) => {
  try {
    const { resume_text } = req.body;
    if (!resume_text) return res.status(400).json({ message: 'resume_text is required.' });

    const extractedSkills = extractSkillsFromText(resume_text);

    const profile = await SkillProfile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found.' });

    // Merge extracted skills with existing ones (avoid duplicates)
    const existingNames = new Set(profile.skills.map(s => s.skill_name));
    const newSkills = extractedSkills
      .filter(s => !existingNames.has(s))
      .map(s => ({ skill_name: s, skill_level: 'Beginner', verified: true }));

    profile.skills.push(...newSkills);
    profile.resume_text = resume_text;
    profile.updated_at = new Date();
    await profile.save();

    res.json({
      message: 'Resume processed successfully.',
      extracted_skills: extractedSkills,
      newly_added: newSkills.map(s => s.skill_name),
      profile
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
