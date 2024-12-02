const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    businessName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    businessType: { type: String, required: true },
}, { timestamps: true });

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;
