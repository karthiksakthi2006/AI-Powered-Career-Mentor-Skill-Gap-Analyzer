require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const roleRoutes = require('./routes/roles');
const analyzeRoutes = require('./routes/analyze');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/analyze', analyzeRoutes);

app.get('/', (req, res) => {
  res.send('AI-Powered Career Mentor & Skill Gap Analyzer API is running.');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/career_mentor')
  .then(() => {
    console.log('MongoDB connected.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
