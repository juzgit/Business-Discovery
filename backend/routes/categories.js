const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');

//creating a new category
router.post('/', async (req, res) => {
    try{
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json(category);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get all categories
router.get("/", async (req, res) => {
    try{
        const categories = await Category.find();
        res.json(categories);
    } catch (error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

//get a specific category by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

