const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);