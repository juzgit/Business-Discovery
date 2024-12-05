const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');

//get all reviews
router.get('/', async (req, res) => {
    try{
        const reviews = await Review.find();
        res.json(reviews);
    } catch(err){
        res.status(500).json({ error: 'Server error' });
    }
});

//post reviews
router.post('/', async (req, res) => {
    const { name, rating, comment } = req.body;

    try{
        const newReview = new Review({
            name,
            rating,
            comment,
        });

        const review = await newReview.save();
        res.json(review);
    } catch(err){
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;