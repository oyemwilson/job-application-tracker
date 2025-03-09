import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import api from '../services/api';

function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    setLoading(true); // Set loading state to true
  
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setLoading(false); // Set loading state to false
      return;
    }
  
    try {
      const res = await axios.get('https://job-application-tracker-aazk.onrender.com//api/jobs/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log('Fetched jobs:', res.data);
      setJobs(res.data); // Update the jobs state with the response data
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        console.error('Error response:', err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
      } else {
        // Something happened in setting up the request
        console.error('Error:', err.message);
      }
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="mb-4">
      <h3>Job Recommendations</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {jobs.map((job, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                <p className="card-text">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={fetchRecommendations} className="btn btn-primary">Refresh Recommendations</button>
    </div>
  );
}

export default JobRecommendations;