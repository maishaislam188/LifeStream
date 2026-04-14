const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const authMiddleware = require('../middleware/auth');

// Post emergency request
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { patientName, bloodGroup, location, phone, message, isUrgent } = req.body;

    const request = new BloodRequest({
      patientName, bloodGroup, location,
      phone, message, isUrgent,
      postedBy: req.user.id
    });

    await request.save();
    res.status(201).json({ message: 'Request posted successfully', request });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate('postedBy', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update request status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await BloodRequest.findByIdAndUpdate(req.id, { status });
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete request
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await BloodRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;