import React, { useState, useEffect } from 'react';
import CardForm from '../components/CardForm';
import { Link } from '@reach/router';
import axios from 'axios';
import styles from './addcard.module.css';

const AddCards = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);
    const [deck, setDeck] = useState({
        topic: "",
        creator: "",
        cards: []
    });
    const [card, setCard] = useState({
        frontText: "",
        backText: ""
    });
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/decks/${props.id}`)
            .then(res=>{
                console.log(res.data.results);
                setDeck(res.data.results);
            })
            .catch(err => console.log(err));
    },[isSubmitted, props.id]);
    const addCard = e =>  {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/cards/new`, card)
        .then(res => 
            axios.put(`http://localhost:8000/api/decks/update/${props.id}`, {$push: {cards: res.data.results}})
                .then(res=>{
                    setCard({
                        frontText: "",
                        backText: ""
                    })
                    setIsSubmitted(!isSubmitted);
                })
                .catch(err=> console.log(err))
            )
        .catch(err=>{
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }
    return (
        <div>
            <div className={`pt-1 pb-1 shadow text-light ${styles.headerbackground}`}>
                <h2 className={styles.headermargin}>{deck.name}</h2>
            </div>
            <div className={`rounded-pill shadow p-3 ${styles.cardcounter}`}>
                <h5 className="fs-3">Deck Size: <span className="fw-bolder">{deck.cards.length}</span></h5>
            </div>
            <Link className={`fw-bold fs-3 text-decoration-none ${styles.studylink}`} to={`/decks/${deck._id}`}>Study {deck.topic}</Link>
            <div className={`d-flex justify-content-center ${styles.formmargin}`}>
                {errors.map((err, idx) => <p className="text-danger" key={idx}>{err}</p>)}
                <CardForm card={card} setCard={setCard} onSubmitProp={addCard}/>
            </div>
            <div className={`${styles.homebutton}`}>
                <Link className={`text-light shadow fw-bold rounded-circle bg-info p-4 text-decoration-none`} to="/">Home</Link>
            </div>
        </div>
    );
};

export default AddCards;