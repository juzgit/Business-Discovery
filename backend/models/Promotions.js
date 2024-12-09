const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    type: { type: String, default: "Discount" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discount: { type: Number, min: 0, max: 100 },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
    },
},
    { timestamps: true }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;