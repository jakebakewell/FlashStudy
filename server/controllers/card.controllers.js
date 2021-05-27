const {Card} = require('../models/deck.models');

module.exports.findAll = (req, res) => {
    Card.find()
        .then(data => res.json({ results: data }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findOne = (req, res) => {
    Card.findOne({ _id: req.params.id })
        .then(data => res.json({ results: data }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createNew = (req, res) => {
    Card.create(req.body)
        .then(data => res.json({ results: data }))
        .catch(err => res.status(400).json(err));
}

module.exports.updateExisting = (req, res) => {
    Card.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { useFindAndModify: true, runValidators: true }
    )
        .then(data => res.json({ results: data }))
        .catch(err => res.json(err.errors));
}

module.exports.deleteExisting = (req, res) => {
    Card.deleteOne({ _id: req.params.id })
        .then(data => res.json({ results: data }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}