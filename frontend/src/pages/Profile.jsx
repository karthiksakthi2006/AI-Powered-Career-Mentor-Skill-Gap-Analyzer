import React, { useState, useEffect } from 'react';
import api from '../api.js';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [resumeText, setResumeText] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const addSkill = async () => {
    if (!skillName.trim()) return;
    const updatedSkills = [
      ...profile.skills,
      { skill_name: skillName.trim().toLowerCase(), skill_level: skillLevel, verified: false }
    ];
    await saveSkills(updatedSkills);
    setSkillName('');
    setSkillLevel('Beginner');
  };

  const removeSkill = async (index) => {
    const updatedSkills = profile.skills.filter((_, i) => i !== index);
    await saveSkills(updatedSkills);
  };

  const saveSkills = async (skills) => {
    try {
      const res = await api.put('/profile/skills', { skills, target_role: profile.target_role });
      setProfile(res.data.profile);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage('Error updating profile.');
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    try {
      const res = await api.post('/profile/resume', { resume_text: resumeText });
      setProfile(res.data.profile);
      setMessage(`Resume processed. New skills added: ${res.data.newly_added.join(', ') || 'none (already in profile)'}`);
      setResumeText('');
    } catch (err) {
      setMessage('Error processing resume.');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Skill Profile</h1>

      {message && <div className="bg-blue-50 text-blue-700 p-3 rounded mb-4 text-sm">{message}</div>}

      {/* Resume Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Resume / Skill Extraction (AI/NLP Engine)</h2>
        <p className="text-sm text-gray-500 mb-2">Paste your resume text below. Our NLP engine will automatically extract relevant skills.</p>
        <form onSubmit={handleResumeSubmit}>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={6}
            placeholder="Paste your resume content here..."
            className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-purple-700">
            Extract Skills from Resume
          </button>
        </form>
      </div>

      {/* Manual Skill Entry */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Skill Manually</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="e.g. react.js, python, sql"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {SKILL_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
          <button onClick={addSkill} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>

      {/* Current Skills List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-3">My Skills ({profile.skills.length})</h2>
        {profile.skills.length === 0 ? (
          <p className="text-gray-500 text-sm">No skills added yet. Add skills manually or upload your resume.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm">
                <span className="font-medium">{skill.skill_name}</span>
                <span className="text-xs text-gray-500">({skill.skill_level})</span>
                {skill.verified && <span className="text-xs text-green-600">✓ resume</span>}
                <button onClick={() => removeSkill(idx)} className="text-red-500 hover:text-red-700 font-bold">×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
