const express = require('express');
const router = express.Router();
const User = require('../models/User');
const BloodRequest = require('../models/BloodRequest');
const authMiddleware = require('../middleware/auth');

// ✅ Admin Check Middleware
const adminCheck = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// ================= USERS =================

// Get all users
router.get('/users', authMiddleware, adminCheck, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ❗ Prevent deleting admin
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= REQUESTS =================

// Get all requests
router.get('/requests', authMiddleware, adminCheck, async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate('postedBy', 'name email phone')
      .populate('acceptedBy', 'name phone') // 🔥 ADD THIS
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete request
router.delete('/requests/:id', authMiddleware, adminCheck, async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await request.deleteOne();

    res.json({ message: 'Request deleted' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= STATS =================

router.get('/stats', authMiddleware, adminCheck, async (req, res) => {
  try {
    const totalDonors = await User.countDocuments({
      role: { $regex: /^donor$/i }
    });

    const totalPatients = await User.countDocuments({
      role: { $regex: /^patient$/i }
    });

    const totalRequests = await BloodRequest.countDocuments();
    const urgentRequests = await BloodRequest.countDocuments({ isUrgent: true });
    const pendingRequests = await BloodRequest.countDocuments({ status: 'pending' });

    res.json({
      totalDonors,
      totalPatients,
      totalRequests,
      urgentRequests,
      pendingRequests
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;