import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get('/roles');
        setRoles(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const analyzeRole = async (roleId) => {
    try {
      const res = await api.post('/analyze/gap', { role_id: roleId });
      navigate('/analysis', { state: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading job roles...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Job Roles</h1>
      <p className="text-gray-500 mb-6">Aggregated from job portals (LinkedIn, Indeed, Naukri) — real-time required skills and demand.</p>

      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div key={role._id} className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold text-gray-800">{role.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{role.industry} • Avg Salary: ₹{role.avg_salary.toLocaleString()}</p>
            <div className="text-sm text-gray-600 mb-3">
              Demand Score: <span className="font-medium">{role.demand_score}/100</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {role.required_skills.map((skill, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{skill}</span>
              ))}
            </div>
            <button
              onClick={() => analyzeRole(role._id)}
              className="bg-primary text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 w-full"
            >
              Analyze My Skill Gap
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
