const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerAdmin = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        console.log("pasword: ", password);
        console.log("confirmPassword ", confirmPassword);

        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt();
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log(err);
                res.status(500).json({ err: err });
            }

            const newAdmin = new Admin({ fullName, email, password: hash })
            newAdmin.save()
                .then(result => {
                    res.status(201).json({ message: 'Admin registered successfully' });
                    console.log('SUCCESSFULLY Registered');
                })
                .catch(err => console.log(err));
        })
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid Email' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Login successful', token , name:admin.fullName});
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};
