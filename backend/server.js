const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(
    cors({
      origin: 'http://localhost:3000',
      // Additional options can be added here
    })
  );
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/jobApplications'));
app.use('/api/resume', require('./routes/resume'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));