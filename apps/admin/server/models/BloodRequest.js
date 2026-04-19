const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "fulfilled", "closed"],
      default: "pending",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
