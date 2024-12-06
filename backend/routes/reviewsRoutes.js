const express = require('express');
const router = express.Router();
const Review = require('../models/Reviews');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//Middleware: authenticate the business user.
const authenticateUser = async (req, res, next) => {
    // Get the authorization header from the incoming request
    // if the authorization header is undefined, the code won't throw an error.
    // Extract the token by splitting the string into two parts: Bearer and the token itself.
    // The token is stored in token.
    const token = req.headers['authorization']?.split(' ')[1];

    //if there is no token, send an error message. 
    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }

    try{
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //extract the businessId from the decoded token and attach it to the req object
        req.businessId = decoded.businessId;
        //continue to the next route handler.
        next();
    } catch(error){
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

//get all reviews
router.get('/', authenticateUser, async (req, res) => {
    const { businessId } = req;

    if(!businessId){
        return res.status(400).json({ error: 'Business ID is missing' });
    }

    try{
        const reviews = await Review.find({ businessId });
        res.json(reviews);
    } catch(err){
        console.error('Error fetching reviews:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

//post reviews
router.post('/', async (req, res) => {
    const { name, rating, comment, businessId } = req.body;

    if(!name || !rating || !comment || !businessId){
        return res.status(400).json({ error: 'All fields are required' })
    }

    if(!mongoose.Types.ObjectId.isValid(businessId)){
        return res.status(400).json({ error: 'Invalid businessId' });
    }

    try{
        const newReview = new Review({
            name,
            rating,
            comment,
            businessId,
        });

        const review = await newReview.save();
        res.json(review);
    } catch(err){
        console.error('Error saving review:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;