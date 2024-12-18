const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Business = require('../models/Business');
const Review = require('../models/Reviews');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//link the profile to the user.
const userAuthenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try{

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     req.userId = decoded.userId;

     next();

    } catch(error){
        console.error('Token verification error:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

};

//only emails ending with "@gmail.com are allowed"
const emailValidation = (req, res, next) => {
    if(!req.body.emailAddress){
        return res.status(403).json({ message: 'Invalid email.' })
    }

    const email = req.body.emailAddress;
    console.log('Received email:', email);

    if(!email.endsWith('@gmail.com')){
        return res.status(400).json({ message: 'Only email addresses ending with "@gmail.com" are allowed.' });
    }
    next();
};

// Register user
router.post('/register', emailValidation, async (req, res) => {
    const { firstName, lastName, emailAddress, username, password } = req.body;

    if(!username || username.trim() === ""){
        return res.status(400).json({ message: "Username is required" });
    }

    try{
        //check if the user already exists
        const userExists = await User.findOne({ emailAddress });
        if (userExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const newUser = new User({
            firstName,
            lastName,
            emailAddress,
            username,
            password: hashedPassword,
        });

        //Save to database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error){
        if(error.code === 11000){
            if(error.keyValue.username){
                return res.status(400).json({ message: 'Username is already in use' });
            } else if (error.keyValue.emailAddress){
                return res.status(400).json({ message: 'Email already in use' });
            }
        }
        res.status(500).json({ message: error.message });
    }
});

//user login
router.post('/login', emailValidation, async (req, res) => {
    const { emailAddress, password } = req.body;

    if(!emailAddress || emailAddress.trim() === ""){
        return res.status(400).json({ message: "Email Address is required" });
    }

    try{
        const user = await User.findOne({ emailAddress });

        if(!user){
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h"});
            res.json({ token, userId: user._id });
        }else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch(error){
        console.error('Error finding user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//get the user profile info.
router.get('/profile', userAuthenticate, async (req, res) => {
    try{
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch(error){
        console.error('Error fetching user profile"', error);
        res.status(500).json({ message: 'Server error', error: error.message })
    }
});

//update the user profile info
router.put('/update', userAuthenticate, async (req, res) => {
    try{
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const { firstName, lastName ,username, emailAddress, bio } = req.body;

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.emailAddress = emailAddress || user.emailAddress;
        user.bio = bio || user.bio;

        await user.save();

        res.status(200).json(user);
    } catch(error){
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//save favourite business
router.post('/favourites/:businessId', userAuthenticate, async (req, res) => {
    const userId = req.userId;
    const { businessId } = req.params;

    try{
        const business = await Business.findById(businessId);
        if(!business){
            return res.status(404).json({ message: 'Business not found' });
        }

        const user = await User.findById(userId);
        if(!user.favouriteBusinesses.includes(businessId)){
            user.favouriteBusinesses.push(businessId);
            await user.save();
        }

        res.status(200).json({ message: 'Business added to favourites', favouriteBusinesses: user.favouriteBusinesses });
    } catch(error){
        console.error('Error adding to favourites:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//delete favourite business
router.delete('/favourites/:businessId', userAuthenticate, async (req, res) => {
    const userId = req.userId;
    const { businessId } = req.params;
    console.log('Business ID:', businessId);

    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const businessIndex = user.favouriteBusinesses.indexOf(businessId);
        if(businessIndex !== -1){
            user.favouriteBusinesses.splice(businessIndex, 1);
            await user.save();
            return res.status(200).json({ message: 'Favourite removed.' });
        }

        res.status(400).json({ message: 'Business not found in favourites.' });
    } catch(error){
        console.error('Error removing from favourites:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//get all favourite businesses.
router.get('/favourites', userAuthenticate, async(req, res) => {
    try{
        const user = await User.findById(req.userId).populate('favouriteBusinesses', 'businessName');
        res.status(200).json({ favouriteBusiness: user.favouriteBusinesses });
    } catch(error){
        console.error('Error fetching favourites:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Get the user metrics
router.get('/metrics', userAuthenticate, async (req, res) => {
    const userId = req.userId;
    const favouriteBusiness = req.favouriteBusinesses;

    try{
        const reviews = await Review.find({ userId }); //get the reviews that were submitted by the user
        const totalReviews = reviews.length; //get the total reviews.

        const favourites = await User.find({ favouriteBusiness }); //get the businesses that were favourited by the user
        const totalFavourites = favourites.length; //get the total favourites.

        res.json({
            totalReviews,
            totalFavourites,
        });
    } catch (error){
        console.error('Error fetching user metrics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;