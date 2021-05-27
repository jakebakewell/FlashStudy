import React, { useState} from 'react';
import DeckForm from '../components/DeckForm';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import styles from './createdeck.module.css';

const CreateDeck = () => {
    const [errors, setErrors] = useState([]);
    const [deck, setDeck] = useState({
        name: "",
        topic: "",
        creator: ""
    });
    const createDeck = e => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/decks/new`, deck)
            .then(res=>{
                console.log(res);
                if (res.status === 200) {
                    navigate(`/decks/${res.data.results._id}/addcards`);
                }
            })
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
                <h2 className={styles.headermargin}>New Deck</h2>
            </div>
            {errors.map((err, idx) => <p className="text-danger" key={idx}>{err}</p>)}
            <div className={`d-flex justify-content-evenly ${styles.flexmargin}`}>
                <div className={`${styles.formmargin}`}>
                    <DeckForm deck={deck} setDeck={setDeck} onSubmitProp={createDeck}/>
                </div>
                <div className="d-flex flex-column">
                    <img className="shadow" src="https://static.boredpanda.com/blog/wp-content/uploads/2020/09/lo-fi-hip-hop-study-girl-different-countries-1.jpg" alt="lo-fi study girl"/>
                    <Link className="text-light text-decoration-none" to="https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM">Do you need beats to study to?</Link>
                </div>
            </div>
            <div className={`${styles.homebutton}`}>
                <Link className={`text-light shadow fw-bold rounded-circle bg-info p-4 text-decoration-none`} to="/">Home</Link>
            </div>
        </div>
    );
};

export default CreateDeck;