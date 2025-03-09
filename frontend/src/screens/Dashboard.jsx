import React from 'react';
import JobApplications from '../components/JobApplications';
import SkillsManager from '../components/SkillManager';
import ResumeFeedback from '../components/RessumeFeedback';
import JobRecommendations from '../components/JobReccomendations';


function Dashboard({ logout }) {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">Job Tracker</span>
        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
      </nav>
      <div className="container mt-4">
        <h1>Dashboard</h1>
        <SkillsManager />
        <JobApplications /> 
        <ResumeFeedback/>
        <JobRecommendations />
      </div>
    </div>
  );
}

export default Dashboard;