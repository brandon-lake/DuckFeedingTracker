const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedingSchema = new Schema({
    numberOfDucks: { type: Number, required: true },
    feedingLocation: { type: String, required: true },
    feedingTime: { type: Date, required: true },
    food: { type: String, required: true },
    foodQuantity: { type: Number, required: true },
}, {
    timestamps: true,
});

const Feeding = mongoose.model('Feeding', feedingSchema);

module.exports = Feeding;