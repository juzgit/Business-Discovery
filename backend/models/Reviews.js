const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment:{
        type: String,
        required: true,
        maxlength: 500,
    },

    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;