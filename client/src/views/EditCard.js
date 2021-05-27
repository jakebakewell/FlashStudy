import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import CardForm from '../components/CardForm';
import styles from './editcard.module.css';

const EditCard = (props) => {
    const { cardId, deckId } = props;
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/cards/${cardId}`)
            .then(res => {
                setCard(res.data.results);
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [cardId,loaded]);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/decks/${deckId}`)
            .then(res => {
                setDeck(res.data.results);
                console.log("Inside of the deck useEffect")
                setCards(res.data.results.cards);
            })
            .catch(err => console.log(err))
    }, [cardId, deckId]);
    const editCard = e => {
        e.preventDefault();
        let index = cards.findIndex(i => i._id === cardId);
        console.log(index);
        let newArr = cards;
        newArr[index] = card;
        setCards(newArr);
        setDeck({...deck,
                cards : newArr})
        console.log("cards");
        console.log(deck.cards);
        axios.put(`http://localhost:8000/api/decks/update/${deckId}`, deck)
        .then(res => {
            console.log("deck update results");
            console.log(res.data.results.cards);
            axios.put(`http://localhost:8000/api/cards/update/${cardId}`, card)
            .then(res => {
                console.log("updated card");
                console.log(res.data.results);
                setLoaded(!loaded)
                navigate(`/decks/${deckId}/edit`);
            })
        })
        .catch(err => console.log(err))
        .catch(err => console.log(err))
    };
    return (
        <div>
            <div className={`shadow ${styles.headerbackground}`}>
                <h2 className={`text-light pb-2 pt-2 fs-1 ${styles.headermargin}`}>Edit Card</h2>
            </div>
            <div className={`container`}>
                <CardForm card={card} setCard={setCard} onSubmitProp={editCard}/>
            </div>
            <div className={`${styles.homebutton}`}>
                <Link className={`text-light shadow fw-bold rounded-circle bg-info p-4 text-decoration-none`} to="/">Home</Link>
            </div>
        </div>
    );
};

export default EditCard;