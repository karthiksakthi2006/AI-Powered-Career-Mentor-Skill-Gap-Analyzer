import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#22c55e', '#ef4444'];

export default function SkillGapResult() {
  const { state } = useLocation();

  if (!state) return <Navigate to="/dashboard" />;

  const { role, matched_skills, missing_skills, readiness_score, recommended_courses } = state;

  const chartData = [
    { name: 'Matched Skills', value: matched_skills.length },
    { name: 'Missing Skills', value: missing_skills.length }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Skill Gap Analysis: {role.title}</h1>
      <p className="text-gray-500 mb-6">{role.industry} • Demand Score: {role.demand_score}/100</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Readiness Score: {readiness_score}%</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Skills lists */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="font-semibold text-green-600 mb-2">Matched Skills ({matched_skills.length})</h3>
          <div className="flex flex-wrap gap-1 mb-4">
            {matched_skills.length > 0 ? matched_skills.map((s, i) => (
              <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{s}</span>
            )) : <span className="text-sm text-gray-400">None yet</span>}
          </div>

          <h3 className="font-semibold text-red-500 mb-2">Missing Skills ({missing_skills.length})</h3>
          <div className="flex flex-wrap gap-1">
            {missing_skills.length > 0 ? missing_skills.map((s, i) => (
              <span key={i} className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">{s}</span>
            )) : <span className="text-sm text-gray-400">None — fully matched!</span>}
          </div>
        </div>
      </div>

      {/* Personalized Learning Path */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-3">Personalized Learning Path (Coursera / Udemy)</h2>
        {recommended_courses.length === 0 ? (
          <p className="text-sm text-gray-500">No additional courses needed — you're fully prepared for this role!</p>
        ) : (
          <div className="space-y-3">
            {recommended_courses.map((c, i) => (
              <div key={i} className="border rounded p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800">{c.title}</div>
                  <div className="text-xs text-gray-500">Skill: {c.skill} • Platform: {c.platform}</div>
                </div>
                <a href={c.url} target="_blank" rel="noreferrer" className="text-primary text-sm font-medium hover:underline">
                  View Course →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link to="/roadmaps" className="text-primary font-medium hover:underline">View all my saved roadmaps →</Link>
      </div>
    </div>
  );
}
