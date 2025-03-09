
import React, { useEffect, useState } from 'react';
import JobList from '../components/Joblist';
import axios from 'axios';

const Landingpage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from the backend
    axios.get('http://localhost:5000/api/jobs')
      .then((response) => setJobs(response.data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Job Recommendations</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
export default Landingpage;