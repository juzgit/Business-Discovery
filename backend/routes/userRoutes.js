const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        if(error.code === 1100){
            if(error.keyValue.username){
                return res.status(400).json({ message: 'Username is already in use' });
            } else if (error.keyValue.emailAddress){
                return res.status(400).json({ message: 'Emai; already in use' });
            }
        }
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;