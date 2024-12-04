const express = require('express');
const Promotion = require('../models/Promotions');
const moment = require('moment');
const router = express.Router();

//get all promotions
router.get('/', async (req, res) => {
    try{
        const promotions = await Promotion.find();
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
router.post('/', async (req, res) => {
    const { title, description, type, startDate, endDate, discount } = req.body;

    const start = moment(startDate, 'YYYY-MM-DDTHH:mm').toDate();
    const end = moment(endDate, 'YYYY-MM-DDTHH:mm').toDate();

    const newPromotion = new Promotion({
        title,
        description,
        type,
        startDate: start,
        endDate: end,
        discount,
    });

    try{
        const savedPromotion = await newPromotion.save();
        res.status(201).json(savedPromotion);
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

//update an existing promotion
router.put('/:id', async (req, res) => {
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
        };

        const updated = await Promotion.findByIdAndUpdate(req.params.id, updatedPromotion, { new: true });

        if(!updated){
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.json(updated);
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

//delete a promotion
router.delete("/:id", async (req, res) => {
    try{
        await Promotion.findByIdAndDelete(req.params.id);
        res.json({ message: "Promotion deleted" });
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;