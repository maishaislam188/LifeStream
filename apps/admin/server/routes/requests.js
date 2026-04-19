const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");
const authMiddleware = require("../middleware/auth");
const Donor = require("../models/Donor");

const User = require("../models/User");

// Post emergency request
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { patientName, bloodGroup, location, phone, message, isUrgent } =
      req.body;

    const request = new BloodRequest({
      patientName,
      bloodGroup,
      location,
      phone,
      message,
      isUrgent,
      postedBy: req.user.id,
    });

    await request.save();
    res.status(201).json({ message: "Request posted successfully", request });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("postedBy", "name email phone")
      .populate("acceptedBy", "name phone") // ✅ ADD THIS LINE
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update request status

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const request = await BloodRequest.findById(req.params.id);

    request.status = status;

    if (status === "fulfilled") {
      request.acceptedBy = req.user.id;

      // ✅ ADD THIS LINE HERE
      await User.findByIdAndUpdate(req.user.id, {
        isAvailable: false,
      });
    }

    await request.save();

    res.json({ message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete request
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await BloodRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ================================
// ✅ GET MY REQUESTS (Patient)
// ================================
router.get("/my-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await BloodRequest.find({
      postedBy: req.user.id,
    }).populate("acceptedBy", "name phone");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================================
// ✅ GET MY DONATIONS (Donor)
// ================================
router.get("/my-donations", authMiddleware, async (req, res) => {
  try {
    const requests = await BloodRequest.find({ acceptedBy: req.user.id });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
