/**
 * RESUME SKILL EXTRACTOR
 * --------------------------------------------
 * Extracts skills from raw resume text by matching against
 * a known skill dictionary (simulates NLP-based skill extraction).
 *
 * For production: replace/augment with spaCy NER or OpenAI API
 * for more accurate extraction from unstructured text.
 */

const { normalize } = require('./skillGapEngine');

// Master skill dictionary - extend as needed
const SKILL_DICTIONARY = [
  'javascript', 'python', 'java', 'c++', 'c', 'react', 'react.js', 'node.js', 'express.js',
  'mongodb', 'mysql', 'postgresql', 'sql', 'html', 'css', 'tailwind css', 'bootstrap',
  'machine learning', 'deep learning', 'nlp', 'data analysis', 'data structures',
  'algorithms', 'git', 'github', 'docker', 'kubernetes', 'aws', 'azure', 'rest api',
  'graphql', 'redux', 'typescript', 'django', 'flask', 'spring boot', 'pandas', 'numpy',
  'tensorflow', 'pytorch', 'scikit-learn', 'power bi', 'tableau', 'excel', 'figma',
  'ui/ux design', 'agile', 'jira', 'linux', 'shell scripting', 'firebase', 'jwt',
  'oauth', 'microservices', 'ci/cd', 'jenkins', 'redis', 'elasticsearch', 'next.js',
  'vue.js', 'angular', 'php', 'laravel', 'r programming', 'tensorboard', 'opencv'
];

/**
 * Extract skills mentioned in resume text by matching against the dictionary.
 * Returns array of normalized skill names found.
 */
function extractSkillsFromText(resumeText) {
  const text = resumeText.toLowerCase();
  const found = [];

  for (const skill of SKILL_DICTIONARY) {
    const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (pattern.test(text)) {
      found.push(normalize(skill));
    }
  }

  return [...new Set(found)];
}

module.exports = { extractSkillsFromText, SKILL_DICTIONARY };
