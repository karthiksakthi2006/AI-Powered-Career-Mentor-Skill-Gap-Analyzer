import React, { useState, useEffect } from 'react';
import api from '../api.js';

export default function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await api.get('/analyze/roadmaps');
        setRoadmaps(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading roadmaps...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Saved Roadmaps</h1>

      {roadmaps.length === 0 ? (
        <p className="text-gray-500">No roadmaps yet. Go to Dashboard or Job Roles and analyze a role to generate one.</p>
      ) : (
        <div className="space-y-4">
          {roadmaps.map((r) => (
            <div key={r._id} className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{r.target_role_title}</h2>
                <span className="text-sm font-medium text-gray-600">Readiness: {r.readiness_score}%</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Created: {new Date(r.created_at).toLocaleDateString()}</p>
              <div className="text-sm text-gray-600 mb-2">
                <span className="text-green-600 font-medium">{r.matched_skills.length} matched</span>
                {' • '}
                <span className="text-red-500 font-medium">{r.missing_skills.length} missing</span>
                {' • '}
                <span>{r.recommended_courses.length} courses recommended</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {r.missing_skills.map((s, i) => (
                  <span key={i} className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
