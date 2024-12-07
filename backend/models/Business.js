const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    businessName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    businessType: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    hours: { type: String },
    businessWebsite: { type: String },
}, { timestamps: true });

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;
