const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Donor = require('../models/Donor');
const authMiddleware = require('../middleware/auth');


// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, bloodGroup, location, phone } = req.body;

    // Email already exists check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name, email,
      password: hashedPassword,
      role, bloodGroup, location, phone
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ================================
// ✅ GET PROFILE
// ================================
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});


// ================================
// ✅ UPDATE PROFILE
// ================================
router.put('/me', authMiddleware, async (req, res) => {
  const { name, phone, location, isAvailable } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone, location, isAvailable },
    { new: true }
  );

  res.json(user);
});

module.exports = router;