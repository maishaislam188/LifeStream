const express = require('express');
const router = express.Router();
const User = require('../models/User');
const BloodRequest = require('../models/BloodRequest');
const authMiddleware = require('../middleware/auth');

const adminCheck = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

router.get('/users', authMiddleware, adminCheck, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/users/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/requests', authMiddleware, adminCheck, async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/requests/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    await BloodRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/stats', authMiddleware, adminCheck, async (req, res) => {
  try {
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalRequests = await BloodRequest.countDocuments();
    const urgentRequests = await BloodRequest.countDocuments({ isUrgent: true });
    const pendingRequests = await BloodRequest.countDocuments({ status: 'pending' });
    res.json({ totalDonors, totalPatients, totalRequests, urgentRequests, pendingRequests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;