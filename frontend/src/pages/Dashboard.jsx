import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.get('/analyze/recommendations');
        setRecommendations(res.data.recommendations);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching recommendations.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const analyzeRole = async (roleId) => {
    try {
      const res = await api.post('/analyze/gap', { role_id: roleId });
      navigate('/analysis', { state: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const getReadinessColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) return <div className="p-8 text-center">Analyzing your profile against job market data...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Career Recommendations</h1>
      <p className="text-gray-500 mb-6">
        Based on your skill profile, matched against real job-market requirements (LinkedIn / Indeed / Naukri data) using AI similarity scoring.
      </p>

      {error && (
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded mb-4">
          {error} — <a href="/profile" className="underline font-medium">Go to Profile</a> to add skills.
        </div>
      )}

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.role_id} className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{rec.title}</h2>
                <p className="text-sm text-gray-500">{rec.industry} • Demand Score: {rec.demand_score}/100 • Avg Salary: ₹{rec.avg_salary.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{rec.readiness_score}%</div>
                <div className="text-xs text-gray-500">Readiness</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className={`h-2 rounded-full ${getReadinessColor(rec.readiness_score)}`} style={{ width: `${rec.readiness_score}%` }}></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="text-green-600 font-medium">{rec.matched_skills.length} matched</span>
                {' • '}
                <span className="text-red-500 font-medium">{rec.missing_skills.length} missing</span>
              </div>
              <button
                onClick={() => analyzeRole(rec.role_id)}
                className="bg-primary text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700"
              >
                View Skill Gap & Roadmap
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
