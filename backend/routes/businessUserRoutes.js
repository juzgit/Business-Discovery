const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//middleware for authentication
const authenticateUser = async (req, res, next) => {
    // Get the authorization header from the incoming request
    // if the authorization header is undefined, the code won't throw an error.
    // Extract the token by splitting the string into two parts: Bearer and the token itself.
    // The token is stored in token.
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Received Token:', token);

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

//only emails ending with "@gmail.com are allowed"
const emailValidation = (req, res, next) => {
    const email = req.body.email;

    const emailRegex = /^[a-zA-Z0-9._]+(?<!\.)@gmail\.com$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({ message: 'Only email addresses with valid characters (letters, numbers, underscore, and periods) before "@gmail.com" and no trailing period are allowed.' });
    }
    next();
}; 

//business register
router.post('/register', emailValidation, async (req, res) => {

    const { businessName, email, password, phone, address, businessType } = req.body;

    try{
        

        if(!businessName || !email || !password || !phone|| !address || !businessType){
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        //check for existing Business
        //cannot duplicate business details of existing business
        const [emailExists, businessNameExists] = await Promise.all([
            Business.findOne({ email }),
            Business.findOne({ businessName }),
        ]);

        if(emailExists){
            return res.status(400).json({ message: 'Email already in use' });
        }

        if(businessNameExists){
            return res.status(400).json({ message: 'Business name already in use' });
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
            category: businessType,
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
});

//get all businesses
router.get('/all', async (req, res) => {
    try{
        const businesses = await Business.find().populate('category', 'name');
        res.status(200).json(businesses);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//get business based on category
router.get('/by-category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(categoryId)){
        return res.status(400).json({ message: 'Invalid category ID' });
    }

    try{
        const businesses = await Business.find({ category: categoryId }).exec();

        if(businesses.length === 0){
            return res.status(200).json([]);
        }

        res.status(200).json(businesses);
    } catch(error){
        console.error('Error fetching businesses by category:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

});

//get business profile (for the business user)
router.get('/profile', authenticateUser, async (req, res) => {
    try{
        const business = await Business.findById(req.businessId);

        if(!business){
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json(business);
    } catch(error){
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//display business details for potential customers user
//get business profile based on their id.
router.get('/profile/:id', async (req, res) => {
    //extract the id from the parameters
    const { id } = req.params;

    //validate the id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: 'Invalid business ID' });
    }

    try{
        const business = await Business.findById(id).populate('category', 'name');
        if(!business){
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json(business);
    } catch(error){
        console.error('Error fetching business by ID:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//update business profile
router.put('/update', authenticateUser, async (req, res) => {
    try{
        const business = await Business.findById(req.businessId);
        
        if(!business){
            return res.status(404).json({ message: 'Business not found' });
        }

        const { description, hours, phone, email, businessWebsite } = req.body;
        business.description = description || business.description;
        business.hours = hours || business.hours;
        business.phone = phone || business.phone;
        business.email = email || business.email;
        business.businessWebsite = businessWebsite || business.businessWebsite;

        await business.save();

        res.status(200).json(business);
    } catch(error){
        console.error('Error updating business profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;