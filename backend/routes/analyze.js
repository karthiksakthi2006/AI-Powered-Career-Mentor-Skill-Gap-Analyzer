const express = require('express');
const router = express.Router();

const SkillProfile = require('../models/SkillProfile');
const JobRole = require('../models/JobRole');
const Course = require('../models/Course');
const Roadmap = require('../models/Roadmap');
const authMiddleware = require('../utils/authMiddleware');
const { analyzeSkillGap, recommendRoles } = require('../utils/skillGapEngine');

// GET /api/analyze/recommendations - AI career recommendations
// Ranks all job roles by how well the student's skills match (cosine similarity)
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const profile = await SkillProfile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found.' });

    const studentSkills = profile.skills.map(s => s.skill_name);
    const jobRoles = await JobRole.find();

    if (studentSkills.length === 0) {
      return res.status(400).json({ message: 'Add skills to your profile first to get recommendations.' });
    }

    const ranked = recommendRoles(studentSkills, jobRoles);

    res.json({
      message: 'Career recommendations generated.',
      recommendations: ranked
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// POST /api/analyze/gap - analyze skill gap for a specific job role + generate roadmap
// body: { role_id }
router.post('/gap', authMiddleware, async (req, res) => {
  try {
    const { role_id } = req.body;
    if (!role_id) return res.status(400).json({ message: 'role_id is required.' });

    const profile = await SkillProfile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found.' });

    const role = await JobRole.findById(role_id);
    if (!role) return res.status(404).json({ message: 'Job role not found.' });

    const studentSkills = profile.skills.map(s => s.skill_name);

    // STEP 1: Skill gap analysis (cosine similarity engine)
    const { matched_skills, missing_skills, readiness_score } = analyzeSkillGap(
      studentSkills,
      role.required_skills
    );

    // STEP 2: For each missing skill, find a matching course (course-platform data)
    const recommended_courses = [];
    for (const skill of missing_skills) {
      const course = await Course.findOne({ skill_tag: skill }).sort({ rating: -1 });
      if (course) {
        recommended_courses.push({
          skill,
          course_id: course._id,
          title: course.title,
          platform: course.platform,
          url: course.url
        });
      }
    }

    // STEP 3: Save roadmap
    const roadmap = await Roadmap.create({
      user_id: req.user.id,
      role_id: role._id,
      target_role_title: role.title,
      matched_skills,
      missing_skills,
      readiness_score,
      recommended_courses
    });

    res.json({
      message: 'Skill gap analysis completed.',
      role: { id: role._id, title: role.title, industry: role.industry, demand_score: role.demand_score },
      matched_skills,
      missing_skills,
      readiness_score,
      recommended_courses,
      roadmap_id: roadmap._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET /api/analyze/roadmaps - get all saved roadmaps for the user
router.get('/roadmaps', authMiddleware, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
