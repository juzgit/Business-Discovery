const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    const { businessName, email, password, phone, address, businessType } = req.body;

    try{
        

        if(!businessName || !email || !password || !businessType){
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        //check for existing Business
        const existingBusiness = await Business.findOne({ email });
        if(existingBusiness){
            return res.status(400).json({ message: 'Email already in use.' });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new business
        const newBusiness = new Business({
            businessName,
            email,
            password,
            phone,
            address,
            businessType,
        });

        await newBusiness.save();
        res.status(201).json({ message: 'Business registered successfully!' });
    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;