# AI-Powered Career Mentor & Skill Gap Analyzer

Full-stack project: React + Tailwind (frontend), Node.js + Express (backend), MongoDB (database).
AI engine uses cosine similarity for skill-gap analysis, combining simulated job-portal data
(LinkedIn/Indeed/Naukri) with course-platform data (Coursera/Udemy).

## Project Structure
```
career-mentor/
├── backend/
│   ├── server.js          # Entry point
│   ├── models/             # User, SkillProfile, JobRole, Course, Roadmap
│   ├── routes/             # auth, profile, roles, analyze
│   ├── utils/              # skillGapEngine.js (cosine similarity), resumeParser.js, authMiddleware.js
+│   └── data/seed.js       # Seeds job roles + courses
└── frontend/
   └── src/
      ├── pages/         # Login, Register, Dashboard, Profile, Roles, SkillGapResult, Roadmaps
      ├── components/Navbar.jsx
      ├── context/AuthContext.jsx
      └── api.js
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local install or MongoDB Atlas connection string)

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URI and JWT_SECRET
npm run seed     # Populates job roles + courses
npm run dev      # Starts server on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts on http://localhost:5173
```

## How It Works

1. **Register/Login** — JWT-based auth, password hashed with bcrypt.
2. **Build Profile** — Add skills manually OR paste resume text; NLP-style extractor
  (`utils/resumeParser.js`) matches against a skill dictionary to auto-extract skills.
3. **AI Career Recommendations** (`/api/analyze/recommendations`) — Ranks all job roles
  by cosine similarity between your skill vector and each role's required-skill vector
  (sourced from simulated LinkedIn/Indeed/Naukri data).
4. **Skill Gap Analysis** (`/api/analyze/gap`) — For a chosen role: computes matched/missing
  skills + readiness score (0-100).
5. **Personalized Learning Path** — For each missing skill, looks up the best-rated course
  from the seeded Coursera/Udemy dataset and recommends it.
6. **Roadmaps** — Each analysis is saved to MongoDB and viewable later under "My Roadmaps".

## AI Engine Details (`utils/skillGapEngine.js`)
- Builds binary skill vectors over the union vocabulary of student skills + role required skills
- Computes **cosine similarity** between the two vectors
- `readiness_score = (cosine_similarity * 0.5 + match_ratio * 0.5) * 100`
- `recommendRoles()` ranks all roles by this score → powers "AI Career Recommendations"

## Extending This Project
- Replace `resumeParser.js` keyword matching with spaCy/OpenAI for better NLP extraction
- Replace seeded JobRole/Course data with live API calls (Adzuna/JSearch for jobs, Udemy
  affiliate API for courses)
- Add weighted skill vectors using `skill_level` (Beginner=1, Intermediate=2, Advanced=3)
  for more nuanced similarity scoring

## License

Educational Purpose Only
