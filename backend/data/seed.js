/**
 * SEED SCRIPT
 * Populates JobRole and Course collections with sample data
 * simulating aggregated job-portal and course-platform data.
 *
 * Run: npm run seed
 */

require('dotenv').config();
const mongoose = require('mongoose');
const JobRole = require('../models/JobRole');
const Course = require('../models/Course');

const jobRoles = [
  {
    title: 'Full Stack Developer',
    industry: 'Software Development',
    required_skills: ['javascript', 'react.js', 'node.js', 'express.js', 'mongodb', 'html', 'css', 'rest api', 'git'],
    avg_salary: 650000,
    demand_score: 88,
    source: 'LinkedIn/Indeed/Naukri'
  },
  {
    title: 'Data Analyst',
    industry: 'Data & Analytics',
    required_skills: ['python', 'sql', 'excel', 'data analysis', 'power bi', 'tableau', 'pandas', 'numpy'],
    avg_salary: 550000,
    demand_score: 82,
    source: 'LinkedIn/Indeed/Naukri'
  },
  {
    title: 'Machine Learning Engineer',
    industry: 'Artificial Intelligence',
    required_skills: ['python', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'numpy', 'pandas', 'scikit-learn', 'nlp'],
    avg_salary: 950000,
    demand_score: 90,
    source: 'LinkedIn/Indeed/Naukri'
  },
  {
    title: 'Backend Developer',
    industry: 'Software Development',
    required_skills: ['node.js', 'express.js', 'mongodb', 'sql', 'rest api', 'jwt', 'docker', 'git', 'microservices'],
    avg_salary: 700000,
    demand_score: 80,
    source: 'LinkedIn/Indeed/Naukri'
  },
  {
    title: 'Frontend Developer',
    industry: 'Software Development',
    required_skills: ['html', 'css', 'javascript', 'react.js', 'redux', 'tailwind css', 'typescript', 'git'],
    avg_salary: 600000,
    demand_score: 85,
    source: 'LinkedIn/Indeed/Naukri'
  },
  {
    title: 'DevOps Engineer',
    industry: 'Cloud & Infrastructure',
    required_skills: ['docker', 'kubernetes', 'aws', 'ci/cd', 'jenkins', 'linux', 'shell scripting', 'git'],
    avg_salary: 850000,
    demand_score: 78,
    source: 'LinkedIn/Indeed/Naukri'
  },
  {
    title: 'UI/UX Designer',
    industry: 'Design',
    required_skills: ['ui/ux design', 'figma', 'html', 'css', 'agile'],
    avg_salary: 500000,
    demand_score: 70,
    source: 'LinkedIn/Indeed/Naukri'
  }
];

const courses = [
  // JavaScript / Web
  { title: 'Modern JavaScript From The Beginning', platform: 'Udemy', url: 'https://udemy.com/js-modern', skill_tag: 'javascript', level: 'Beginner', duration_hours: 20, rating: 4.7 },
  { title: 'React - The Complete Guide', platform: 'Udemy', url: 'https://udemy.com/react-guide', skill_tag: 'react.js', level: 'Intermediate', duration_hours: 40, rating: 4.8 },
  { title: 'Node.js, Express, MongoDB & More', platform: 'Udemy', url: 'https://udemy.com/nodejs-bootcamp', skill_tag: 'node.js', level: 'Intermediate', duration_hours: 35, rating: 4.7 },
  { title: 'Express.js Crash Course', platform: 'YouTube', url: 'https://youtube.com/express-crash', skill_tag: 'express.js', level: 'Beginner', duration_hours: 4, rating: 4.5 },
  { title: 'MongoDB - The Complete Developer Guide', platform: 'Udemy', url: 'https://udemy.com/mongodb-guide', skill_tag: 'mongodb', level: 'Intermediate', duration_hours: 17, rating: 4.6 },
  { title: 'HTML, CSS, and Javascript for Web Developers', platform: 'Coursera', url: 'https://coursera.org/html-css-js', skill_tag: 'html', level: 'Beginner', duration_hours: 25, rating: 4.7 },
  { title: 'CSS - The Complete Guide', platform: 'Udemy', url: 'https://udemy.com/css-guide', skill_tag: 'css', level: 'Beginner', duration_hours: 22, rating: 4.6 },
  { title: 'Tailwind CSS From Scratch', platform: 'Udemy', url: 'https://udemy.com/tailwind-css', skill_tag: 'tailwind css', level: 'Beginner', duration_hours: 8, rating: 4.6 },
  { title: 'TypeScript Complete Course', platform: 'Udemy', url: 'https://udemy.com/typescript-course', skill_tag: 'typescript', level: 'Intermediate', duration_hours: 15, rating: 4.6 },
  { title: 'Redux Toolkit Essentials', platform: 'Udemy', url: 'https://udemy.com/redux-toolkit', skill_tag: 'redux', level: 'Intermediate', duration_hours: 6, rating: 4.5 },

  // Python / Data / ML
  { title: 'Python for Everybody', platform: 'Coursera', url: 'https://coursera.org/python-everybody', skill_tag: 'python', level: 'Beginner', duration_hours: 30, rating: 4.8 },
  { title: 'SQL for Data Science', platform: 'Coursera', url: 'https://coursera.org/sql-data-science', skill_tag: 'sql', level: 'Beginner', duration_hours: 18, rating: 4.6 },
  { title: 'Excel Skills for Business', platform: 'Coursera', url: 'https://coursera.org/excel-business', skill_tag: 'excel', level: 'Beginner', duration_hours: 20, rating: 4.7 },
  { title: 'Data Analysis with Python', platform: 'Coursera', url: 'https://coursera.org/data-analysis-python', skill_tag: 'data analysis', level: 'Intermediate', duration_hours: 25, rating: 4.6 },
  { title: 'Power BI Desktop for Business Intelligence', platform: 'Udemy', url: 'https://udemy.com/power-bi', skill_tag: 'power bi', level: 'Beginner', duration_hours: 16, rating: 4.6 },
  { title: 'Tableau 2024 A-Z', platform: 'Udemy', url: 'https://udemy.com/tableau-az', skill_tag: 'tableau', level: 'Beginner', duration_hours: 20, rating: 4.6 },
  { title: 'Pandas for Data Analysis', platform: 'Udemy', url: 'https://udemy.com/pandas-data', skill_tag: 'pandas', level: 'Intermediate', duration_hours: 10, rating: 4.5 },
  { title: 'NumPy Fundamentals', platform: 'YouTube', url: 'https://youtube.com/numpy-fundamentals', skill_tag: 'numpy', level: 'Beginner', duration_hours: 5, rating: 4.5 },
  { title: 'Machine Learning A-Z', platform: 'Udemy', url: 'https://udemy.com/machine-learning-az', skill_tag: 'machine learning', level: 'Intermediate', duration_hours: 45, rating: 4.7 },
  { title: 'Deep Learning Specialization', platform: 'Coursera', url: 'https://coursera.org/deep-learning', skill_tag: 'deep learning', level: 'Advanced', duration_hours: 60, rating: 4.9 },
  { title: 'TensorFlow Developer Certificate', platform: 'Coursera', url: 'https://coursera.org/tensorflow-cert', skill_tag: 'tensorflow', level: 'Advanced', duration_hours: 50, rating: 4.8 },
  { title: 'PyTorch for Deep Learning', platform: 'Udemy', url: 'https://udemy.com/pytorch-deep-learning', skill_tag: 'pytorch', level: 'Advanced', duration_hours: 45, rating: 4.7 },
  { title: 'Scikit-Learn Crash Course', platform: 'YouTube', url: 'https://youtube.com/sklearn-crash', skill_tag: 'scikit-learn', level: 'Intermediate', duration_hours: 6, rating: 4.5 },
  { title: 'Natural Language Processing Specialization', platform: 'Coursera', url: 'https://coursera.org/nlp-specialization', skill_tag: 'nlp', level: 'Advanced', duration_hours: 55, rating: 4.7 },

  // DevOps / Cloud
  { title: 'Docker & Kubernetes: The Complete Guide', platform: 'Udemy', url: 'https://udemy.com/docker-kubernetes', skill_tag: 'docker', level: 'Intermediate', duration_hours: 22, rating: 4.7 },
  { title: 'Kubernetes for Beginners', platform: 'Udemy', url: 'https://udemy.com/kubernetes-beginners', skill_tag: 'kubernetes', level: 'Beginner', duration_hours: 12, rating: 4.6 },
  { title: 'AWS Certified Cloud Practitioner', platform: 'Coursera', url: 'https://coursera.org/aws-cloud-practitioner', skill_tag: 'aws', level: 'Beginner', duration_hours: 25, rating: 4.7 },
  { title: 'CI/CD with Jenkins', platform: 'Udemy', url: 'https://udemy.com/cicd-jenkins', skill_tag: 'ci/cd', level: 'Intermediate', duration_hours: 10, rating: 4.5 },
  { title: 'Jenkins From Zero To Hero', platform: 'Udemy', url: 'https://udemy.com/jenkins-zero-hero', skill_tag: 'jenkins', level: 'Intermediate', duration_hours: 14, rating: 4.5 },
  { title: 'Linux Command Line Basics', platform: 'Udemy', url: 'https://udemy.com/linux-basics', skill_tag: 'linux', level: 'Beginner', duration_hours: 8, rating: 4.6 },
  { title: 'Bash Shell Scripting', platform: 'YouTube', url: 'https://youtube.com/bash-scripting', skill_tag: 'shell scripting', level: 'Beginner', duration_hours: 5, rating: 4.4 },

  // Other
  { title: 'Git & GitHub Crash Course', platform: 'YouTube', url: 'https://youtube.com/git-github-crash', skill_tag: 'git', level: 'Beginner', duration_hours: 4, rating: 4.7 },
  { title: 'REST API Design Best Practices', platform: 'Udemy', url: 'https://udemy.com/rest-api-design', skill_tag: 'rest api', level: 'Intermediate', duration_hours: 8, rating: 4.6 },
  { title: 'JWT Authentication Deep Dive', platform: 'YouTube', url: 'https://youtube.com/jwt-auth', skill_tag: 'jwt', level: 'Intermediate', duration_hours: 3, rating: 4.5 },
  { title: 'Microservices Architecture', platform: 'Udemy', url: 'https://udemy.com/microservices-arch', skill_tag: 'microservices', level: 'Advanced', duration_hours: 18, rating: 4.6 },
  { title: 'Figma UI/UX Design Essentials', platform: 'Udemy', url: 'https://udemy.com/figma-essentials', skill_tag: 'figma', level: 'Beginner', duration_hours: 12, rating: 4.7 },
  { title: 'UI/UX Design Specialization', platform: 'Coursera', url: 'https://coursera.org/ui-ux-design', skill_tag: 'ui/ux design', level: 'Beginner', duration_hours: 30, rating: 4.7 },
  { title: 'Agile Project Management', platform: 'Coursera', url: 'https://coursera.org/agile-pm', skill_tag: 'agile', level: 'Beginner', duration_hours: 10, rating: 4.5 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/career_mentor');
    console.log('Connected to MongoDB for seeding...');

    await JobRole.deleteMany({});
    await Course.deleteMany({});

    await JobRole.insertMany(jobRoles);
    await Course.insertMany(courses);

    console.log(`Seeded ${jobRoles.length} job roles and ${courses.length} courses.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
