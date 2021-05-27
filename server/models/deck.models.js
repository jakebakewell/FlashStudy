
const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    frontText: {
        type: String,
        required: [true, "Front card text is required"]
    },
    backText: {
        type: String,
        required: [true, "Back card text is required"],
    },
},{timestamps: true});



const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    topic: {
        type: String,
        required: [true, "Topic is required"],
        minlength: [3, "Topic must be at least 3 characters long"]
    },
    creator: {
        type: String,
        required: [true, "Creator is required"],
        minlength: [5, "Creator must be at least 5 characters long"]
    },
    cards: [CardSchema]
},{timestamps: true});

module.exports.Card = mongoose.model('Card', CardSchema);
module.exports.Deck = mongoose.model('Deck', DeckSchema);