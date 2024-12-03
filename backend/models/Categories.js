const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Category = mongoose.model('Category', CategoriesSchema);

module.exports = Category;