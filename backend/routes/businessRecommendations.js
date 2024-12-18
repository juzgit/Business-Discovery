const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Reviews');
const Business = require('../models/Business');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//link the profile to the user.
const userAuthenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try{

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     req.user = { id: decoded.userId };

     next();

    } catch(error){
        console.error('Token verification error:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

};
//get business recommendations based on the users interactions
router.get('/businesses', userAuthenticate, async (req, res) => {
    //extracted the userId from userAuthenticate
    const userId = req.user.id;

    try{
        
        //Fetch reviews by the user
        //Retrieve the favouriteBusiness field, find the category of the favourited business
        const user = await User.findById(userId).populate('favouriteBusinesses', 'category');
        //find the category of the reviewed business
        const userReviews = await Review.find({ userId }).populate('businessId', 'category');

        //Get the categories from reviews and favourite business

        //An array of the extracted the categories of the business the user has reviewed.
        const reviewedCategories = userReviews.map(review => review.businessId.category);
        // An array of the extracted categories of the business the user has saved as favourites.
        const favouriteCategories = user.favouriteBusinesses.map(business => business.category);
        //combining the two arrays, making sure there are no duplicate categories.
        const allCategories = [...new Set([...reviewedCategories, ...favouriteCategories])];

        //Exclude already interacted businesses.
        //Used to exclude business from recommendations. 
        const excludeBusinessIds = [
            ...userReviews.map(review => review.businessId._id),
            ...user.favouriteBusinesses.map(business => business._id),
        ];

        //fetch recommendations
        let recommendations;
        //if the recommendations are not empty, fetch the recommendations
        // the selection is based on:
        // the user has not interacted with the business (favouriting or leaving a review)
        // have a category in allCategories
        // limit the recommendations to 15 businesses.
        if(allCategories.length > 0){
            recommendations = await Business.find({
                _id: { $nin: excludeBusinessIds },
                category: { $in: allCategories },
            }).select('businessName category rating').limit(15);
        }

        //sending the response to the client.
        res.json({ recommendations });

    } catch(error){
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
