const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;
    let query = { role: 'donor', isAvailable: true };
    if (bloodGroup && bloodGroup !== '') query.bloodGroup = bloodGroup;
    if (location && location !== '') query.location = { $regex: location, $options: 'i' };
    const donors = await User.find(query).select('-password');
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;