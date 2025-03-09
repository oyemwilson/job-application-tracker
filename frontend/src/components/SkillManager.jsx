import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import api from '../services/api';

function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');


  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const res = await axios.get("https://job-application-tracker-aazk.onrender.com//api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        setSkills(res.data.skills);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (newSkill.trim() !== "") {
      const updatedSkills = [...skills, newSkill.trim()];
      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(
          "https://job-application-tracker-aazk.onrender.com//api/user/skills",
          { skills: updatedSkills },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Server response:", res.data);
        setSkills(updatedSkills);
        setNewSkill("");
      } catch (err) {
        console.error("Error adding skill:", err.response?.data || err.message);
      }
    }
  };
  

  const removeSkill = async (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "https://job-application-tracker-aazk.onrender.com//api/user/skills",
        { skills: updatedSkills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSkills(updatedSkills);
    } catch (err) {
      console.error("Error removing skill:", err);
    }
  };

  return (
    <div className="mb-4">
      <h3>Skills</h3>
      <div>
        {skills.map((skill, index) => (
          <span key={index} className="badge bg-primary m-1">
            {skill} <button className="btn btn-sm btn-danger" onClick={() => removeSkill(index)}>x</button>
          </span>
        ))}
      </div>
      <div className="input-group mt-2" style={{ maxWidth: '300px' }}>
        <input type="text" className="form-control" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
        <button className="btn btn-primary" onClick={addSkill}>Add</button>
      </div>
    </div>
  );
}

export default SkillsManager;