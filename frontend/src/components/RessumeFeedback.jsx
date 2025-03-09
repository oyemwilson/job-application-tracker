import axios from 'axios';
import React, { useState } from 'react';


function ResumeFeedback() {
  const [resumeText, setResumeText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
  
      const res = await axios.post(
        "https://job-application-tracker-aazk.onrender.com/api/resume/feedback",
        { resumeText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error("Error submitting resume feedback:", err.response?.data || err.message);
    }
    setLoading(false);
  };
  

  return (
    <div className="mb-4">
      <h3>Resume Feedback</h3>
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows="10"
        className="form-control mb-2"
        placeholder="Paste your resume here..."
      />
      <button onClick={handleSubmit} className="btn btn-primary">Get Feedback</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-2">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResumeFeedback;