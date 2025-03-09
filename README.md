# AI-Powered Job Application Tracker
# Overview
The AI-Powered Job Application Tracker is a full-stack web application that helps users organize their job search. It enables users to track job applications, get AI-generated resume feedback, and receive personalized job recommendations based on their skills.

# Key Features
User Authentication: Secure login and registration.
Job Application Tracking: Add, edit, and delete job applications.
AI Resume Feedback: Receive mock resume improvement suggestions.
Job Recommendations: View job listings tailored to your skills.
Skills Management: Update skills to refine recommendations.
# How It Works
# User Authentication
Sign Up: Users register with a name, email, password, and optional skills. Passwords are securely hashed.
Log In: Users log in to get a token for accessing protected features.
Log Out: Ends the session by removing the token.
# Job Application Tracking
Users manage applications through a dashboard.
Add job details (title, company, status, etc.), which are stored in a database.
Edit or delete applications with real-time updates.
# AI Resume Feedback
Users submit resume text via a form.
The system returns random improvement suggestions from a preset list, simulating AI analysis.
# Job Recommendations
Jobs are filtered from a mock job dataset based on the user’s skills.
Matching jobs are displayed as recommendations.
# Skills Management
Users can add or remove skills in their profile.
Updated skills are saved and used to refine job recommendations.
# Technologies
Frontend: React, Bootstrap, React Router, Axios.
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcryptjs.
# Setup
Clone the Repo, or download Zip folder

Backend:
Go to backend/, run npm install.
copy and paste .env file in backend root folder that will be sent seperately
Start: node server.js.


Frontend:
Go to frontend/, run npm install.
Add "proxy": "http://localhost:5000" to package.json.
Start: npm start.
Access: Visit http://localhost:3000 in your browser.
