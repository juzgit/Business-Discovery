const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//business register
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
            password: hashedPassword,
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

//business login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || email.trim() === ""){
        return res.status(400).json({ message: "Email Address is required" });
    }

    try{
        const business = await Business.findOne({ email });

        if(!business){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, business.password);

        if(passwordMatch){
            const token = jwt.sign({ businessId: business._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
            res.json({ token, businessId: business._id });
        }else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch(error){
        console.error('Error finding error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
})

module.exports = router;