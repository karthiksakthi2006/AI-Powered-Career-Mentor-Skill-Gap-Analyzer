import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="font-bold text-lg">AI Career Mentor</div>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/profile" className="hover:underline">My Profile</Link>
        <Link to="/roles" className="hover:underline">Job Roles</Link>
        <Link to="/roadmaps" className="hover:underline">My Roadmaps</Link>
        <span className="text-gray-200">Hi, {user?.name}</span>
        <button onClick={handleLogout} className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100">
          Logout
        </button>
      </div>
    </nav>
  );
}
