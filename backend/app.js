const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');
const candidateRoutes = require('./routes/candidate');
const leaveRoutes = require('./routes/leave');
const attendanceRoutes = require('./routes/attendance');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.DB_HOST)
    .then(res => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        })
    })
    .catch(err => console.log(err));