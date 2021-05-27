import React from 'react';
import { Router } from '@reach/router';
import Main from './views/Main';
import CreateDeck from './views/CreateDeck';
import AddCards from './views/AddCards';
import StudyDeck from './views/StudyDeck';
import EditDeck from './views/EditDeck';
import EditCard from './views/EditCard';

function App() {
  return (
    <div>
      <Router>
        <Main path="/"/>
        <CreateDeck path="/decks/new"/>
        <StudyDeck path="/decks/:id"/>
        <EditDeck path="/decks/:id/edit"/>
        <AddCards path="/decks/:id/addcards"/>
        <EditCard path="/cards/:cardId/edit/:deckId"/>
      </Router>
    </div>
  );
}

export default App;
