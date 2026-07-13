const mongoose = require('mongoose');

// Represents a job role with required skills, aggregated from job portals
// (LinkedIn / Indeed / Naukri) - seeded/cached dataset
const jobRoleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  industry: { type: String, default: 'Technology' },
  required_skills: [{ type: String, required: true }], // normalized skill names
  avg_salary: { type: Number, default: 0 },
  demand_score: { type: Number, default: 0 }, // 0-100, simulates "real-time demand" from job portals
  source: { type: String, default: 'LinkedIn/Indeed/Naukri' }
});

module.exports = mongoose.model('JobRole', jobRoleSchema);
