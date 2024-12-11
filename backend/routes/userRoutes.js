const express = require('express');
const router = express.Router();
const User = require('../models/User');
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
        return res.status(401).json({ error: 'Invalid or expired soon' });
    }

};

// Register user
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
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

//Get the user metrics
router.get('/metrics', userAuthenticate, async (req, res) => {
    const userId = req.userId;

    try{
        const reviews = await Review.find({ userId }); //get the reviews that were submitted by the user
        const totalReviews = reviews.length; //get the total reviews.

        res.json({
            totalReviews
        })
    } catch (error){
        console.error('Error fetching user metrics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;