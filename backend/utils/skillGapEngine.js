/**
 * AI INTEGRATION ENGINE
 * --------------------------------------------
 * Combines:
 *  1. Student skill profile (from resume/profile)
 *  2. Job role required skills (simulated job-portal data: LinkedIn/Indeed/Naukri)
 *  3. Course catalog (simulated course-platform data: Coursera/Udemy)
 *
 * Produces:
 *  - matched_skills, missing_skills
 *  - readiness_score (cosine similarity based, 0-100)
 *  - recommended courses for missing skills
 */

// Normalize skill strings for consistent matching
function normalize(skill) {
  return skill.trim().toLowerCase().replace(/[\s_-]+/g, ' ');
}

/**
 * Build a vector from a skill list against a combined vocabulary.
 * Each dimension = 1 if skill present, 0 otherwise (simple binary vector).
 * For weighted version, skill_level could map to 1/2/3.
 */
function buildVector(skillList, vocabulary) {
  const skillSet = new Set(skillList.map(normalize));
  return vocabulary.map(v => (skillSet.has(v) ? 1 : 0));
}

/**
 * Cosine similarity between two equal-length numeric vectors
 */
function cosineSimilarity(vecA, vecB) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Core function: analyze skill gap between student profile and a job role
 *
 * @param {string[]} studentSkills - list of skill names student has
 * @param {string[]} requiredSkills - list of skills required by job role
 * @returns {object} { matched_skills, missing_skills, readiness_score }
 */
function analyzeSkillGap(studentSkills, requiredSkills) {
  const normStudent = studentSkills.map(normalize);
  const normRequired = requiredSkills.map(normalize);

  // Vocabulary = union of both skill sets (for cosine similarity vector space)
  const vocabulary = [...new Set([...normStudent, ...normRequired])];

  const studentVec = buildVector(normStudent, vocabulary);
  const requiredVec = buildVector(normRequired, vocabulary);

  const similarity = cosineSimilarity(studentVec, requiredVec);

  const studentSet = new Set(normStudent);
  const matched_skills = normRequired.filter(s => studentSet.has(s));
  const missing_skills = normRequired.filter(s => !studentSet.has(s));

  // Readiness score: cosine similarity scaled to 0-100,
  // adjusted slightly by direct match ratio for interpretability
  const matchRatio = normRequired.length > 0 ? matched_skills.length / normRequired.length : 0;
  const readiness_score = Math.round(((similarity * 0.5) + (matchRatio * 0.5)) * 100);

  return {
    matched_skills,
    missing_skills,
    readiness_score,
    similarity_raw: Number(similarity.toFixed(3))
  };
}

/**
 * Rank job roles by suitability for a student (used for AI career recommendations)
 * Returns roles sorted by readiness_score descending
 */
function recommendRoles(studentSkills, jobRoles) {
  return jobRoles
    .map(role => {
      const result = analyzeSkillGap(studentSkills, role.required_skills);
      return {
        role_id: role._id,
        title: role.title,
        industry: role.industry,
        avg_salary: role.avg_salary,
        demand_score: role.demand_score,
        ...result
      };
    })
    .sort((a, b) => b.readiness_score - a.readiness_score);
}

module.exports = { normalize, analyzeSkillGap, recommendRoles, cosineSimilarity };
