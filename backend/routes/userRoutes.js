const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = router;