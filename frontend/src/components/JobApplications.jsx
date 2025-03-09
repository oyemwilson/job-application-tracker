import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import api from '../services/api';

function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');
  const [appliedDate, setAppliedDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const res = await axios.get("https://job-application-tracker-aazk.onrender.com/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data || err.message);
    }
  };
  

  const openAddModal = () => {
    setSelectedApplication(null);
    setJobTitle('');
    setCompany('');
    setStatus('Applied');
    setAppliedDate('');
    setNotes('');
    setShowModal(true);
  };

  const openEditModal = (app) => {
    setSelectedApplication(app);
    setJobTitle(app.jobTitle);
    setCompany(app.company);
    setStatus(app.status);
    setAppliedDate(app.appliedDate.split('T')[0]); // Format for date input
    setNotes(app.notes || '');
    setShowModal(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    const applicationData = { jobTitle, company, status, appliedDate, notes };
  
    try {
      if (selectedApplication) {
        await axios.put(
          `https://job-application-tracker-aazk.onrender.com/api/applications/${selectedApplication._id}`,
          applicationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "https://job-application-tracker-aazk.onrender.com/api/applications",
          applicationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      fetchApplications();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving application:", err.response?.data || err.message);
    }
  };
  
  const deleteApplication = async (id) => {
    if (window.confirm("Are you sure?")) {
      console.log('Deleting application with ID:', id); // Log the ID
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        await axios.delete(`https://job-application-tracker-aazk.onrender.com/api/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchApplications();
      } catch (err) {
        console.error("Error deleting application:", err.response?.data || err.message);
      }
    }
  };
  
  return (
    <div className="mb-4">
      <h3>Job Applications</h3>
      <button className="btn btn-success mb-2" onClick={openAddModal}>Add Application</button>
      <table className="table table-striped align-items-center">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.jobTitle}</td>
              <td>{app.company}</td>
              <td>{app.status}</td>
              <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-sm btn-primary mr-2" onClick={() => openEditModal(app)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteApplication(app._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedApplication ? 'Edit Application' : 'Add Application'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Applied</option>
                <option>Interview Scheduled</option>
                <option>Offer Received</option>
                <option>Rejected</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Applied Date</Form.Label>
              <Form.Control type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JobApplications;