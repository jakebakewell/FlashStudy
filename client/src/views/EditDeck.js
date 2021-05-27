import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import styles from './editdeck.module.css';

const EditDeck = (props) => {
    const [deck, setDeck] = useState({
        name: "",
        topic: "",
        creator: "",
        cards: []
    });
    const [rerender, setRerender] = useState(false);
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/decks/${props.id}`)
            .then(res=>{
                console.log(res.data.results);
                setDeck(res.data.results);
            })
            .catch(err => console.log(err));
    }, [props.id, rerender]);


    const editCard = (cardId) => {
        navigate(`/cards/${cardId}/edit/${props.id}`);
    }
    const deleteDeck = (deckId) => {
        axios.delete(`http://localhost:8000/api/decks/delete/${deckId}`)
            .then(res=>{
                console.log(res.data);
                navigate("/");
            })
            .catch(err => console.log(err))
    }
    const deleteCard = (card) => {
        axios.delete(`http://localhost:8000/api/cards/delete/${card._id}`)
            .then(res=>{
                console.log(res.data);
                axios.put(`http://localhost:8000/api/decks/update/${props.id}`, {$pull: {cards: card}})
                .then(res=>{
                    console.log(res.data.results.cards);
                    setRerender(!rerender);
                })
                .catch(err=> console.log(err))
            })
            .catch(err => console.log(err))
    }
    const addCards = (deckId) => {
        navigate(`/decks/${deckId}/addcards`);
    }
    return (
        <div>
            <div className={`d-flex shadow justify-content-center pt-1 pb-1 text-light ${styles.headerbackground}`}>
                <h2 className={`fs-1 ${styles.headermargin}`}>{deck.name}</h2>
                <h3 className={styles.headermargin}>Topic: {deck.topic}</h3>
            </div>
            <h4 className={`text-light ${styles.createdby}`}>Deck created by: <span className="text-info">{deck.creator}</span></h4>
            <div className={`${styles.deckbuttons}`}>
                <button className={`btn shadow btn-danger ${styles.deckdeletebutton}`} onClick={() => deleteDeck(deck._id)}>Delete Deck</button>
                <button className="btn shadow btn-primary" onClick={() => addCards(deck._id)}>Add Cards to Deck</button>
            </div>
            <div className={`container shadow rounded d-flex flex-wrap justify-content-evenly ${styles.mapcards}`}>
                {deck.cards.map( (card, idx) => {
                    return(
                    <div className={`rounded shadow ${styles.mapdivs}`} key={idx}>
                        <p>Front of card: {card.frontText}</p>
                        <p>Back of card: {card.backText}</p>
                        <div className="d-flex justify-content-evenly">
                            <button className={`btn btn-primary ${styles.deckdeletebutton}`} onClick={() => editCard(card._id)}>Edit Card</button>
                            <button className="btn btn-danger" onClick={() => deleteCard(card)}>Remove Card</button>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className={`${styles.homebutton}`}>
                <Link className={`text-light shadow fw-bold rounded-circle bg-info p-4 text-decoration-none`} to="/">Home</Link>
            </div>
        </div>
    );
};

export default EditDeck;