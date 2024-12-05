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
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;