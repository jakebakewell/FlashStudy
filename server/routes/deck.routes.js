const DeckController = require('../controllers/deck.controllers');
const CardController = require('../controllers/card.controllers');

module.exports = app => {
    app.get('/api/decks', DeckController.findAll);
    app.get('/api/cards', CardController.findAll);
    app.post('/api/decks/new', DeckController.createNew);
    app.post('/api/cards/new', CardController.createNew);
    app.get('/api/decks/:id', DeckController.findOne);
    app.get('/api/cards/:id', CardController.findOne);
    app.put('/api/decks/update/:id', DeckController.updateExisting);
    app.put('/api/cards/update/:id', CardController.updateExisting);
    app.delete('/api/decks/delete/:id', DeckController.deleteExisting);
    app.delete('/api/cards/delete/:id', CardController.deleteExisting);
}