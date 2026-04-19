const express = require("express");
const router = express.Router();
const User = require("../models/User");

const Donor = require('../models/Donor');

router.get('/', async (req, res) => {
  try {
    const donors = await User.find({
      role: { $regex: /^donor$/i },
      isAvailable: true // ✅ add this field in User model
    });

    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
