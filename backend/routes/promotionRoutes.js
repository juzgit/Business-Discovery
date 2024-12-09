const express = require('express');
const Promotion = require('../models/Promotions');
const moment = require('moment');
const router = express.Router();
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

//get all promotions
router.get('/', authenticateUser, async (req, res) => {
    const { businessId } = req; 
    console.log('Business ID from token:', businessId);

    try{
        const promotions = await Promotion.find({ businessId });
        console.log('Promotions fetched from database:', promotions);
        const formattedPromotions = promotions.map( promotion => ({
            ...promotion.toObject(),
            startDate: moment(promotion.startDate).format('YYYY-MM-DD hh:mm A'),
            endDate: moment(promotion.endDate).format('YYYY-MM-DD hh:mm A'),
        }))
        res.json(formattedPromotions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//create a new promotion
router.post('/', authenticateUser, async (req, res) => {
    const { title, description, type, startDate, endDate, discount } = req.body;

    console.log('Business ID from req:', req.businessId);

    const start = moment(startDate, 'YYYY-MM-DDTHH:mm').toDate();
    const end = moment(endDate, 'YYYY-MM-DDTHH:mm').toDate();

    const newPromotion = new Promotion({
        title,
        description,
        type,
        startDate: start,
        endDate: end,
        discount,
        businessId: req.businessId,
    });

    try{
        const savedPromotion = await newPromotion.save();
        console.log('Promotion saved:', savedPromotion);
        res.status(201).json(savedPromotion);
    } catch(err){
        console.error('Error saving promotion:', err);
        res.status(400).json({ message: err.message });
    }
});

//update an existing promotion
router.put('/:id', authenticateUser, async (req, res) => {
    try{
        const { title, description, type, startDate, endDate, discount } = req.body;

        const start = moment(startDate, 'YYYY-MM-DDTHH:mm').toDate();
        const end= moment(endDate, 'YYYY-MM-DDTHH:mm').toDate();

        const updatedPromotion = {
            title,
            description,
            type,
            startDate: start,
            endDate: end,
            discount,
            businessId: req.businessId,
        };

        const updated = await Promotion.findByIdAndUpdate({_id: req.params.id, businessId: req.businessId}, updatedPromotion, { new: true });

        if(!updated){
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.json(updated);
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

//delete a promotion
router.delete("/:id", authenticateUser, async (req, res) => {
    try{
        const promotion = await Promotion.findOneAndDelete({
            _id: req.params.id,
            businessId: req.businessId,
        });

        if(!promotion){
            return res.status(404).json({ message: 'Promotion not found' });
        }

        res.json({ message: "Promotion deleted" });
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;