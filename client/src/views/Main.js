import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import styles from './main.module.css';

const Main = () => {
    const [decks, setDecks] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/decks')
            .then(res=>{
                console.log(res.data);
                setDecks(res.data.results);
            })
            .catch(err => console.log(err));
    },[]);
    return (
        <div>
            <div className={`rounded shadow pt-1 pb-1 ${styles.headerbackground}`}>
                <h1 style={styles.h1}>Welcome to FlashStudy</h1>
            </div>
            <div className={`container shadow rounded p-3 ${styles.tablebackground}`}>
                <div className={`rounded shadow pt-1 pb-1 mb-2 ${styles.deckheader}`}>
                    <h4 className={styles.decksubject}>Choose a deck to study</h4>
                </div>
                <table style={styles.table} className="table table-sm shadow table-striped table-borderless table-hover">
                    <thead className="table-dark text-light">
                        <tr>
                            <th>Name</th>
                            <th>Topic</th>
                            <th>Deck Size</th>
                            <th>Creator</th>
                            <th>Edit Deck</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        decks.map( (deck, idx) => {
                            return (
                                <tr key={idx}>
                                    <td><Link className="text-primary text-decoration-none" to={`/decks/${deck._id}`}>{deck.name}</Link></td>
                                    <td>{deck.topic}</td>
                                    <td>{deck.cards.length}</td>
                                    <td>{deck.creator}</td>
                                    <td><Link to={`/decks/${deck._id}/edit`} className="btn btn-info">Edit</Link></td>
                                </tr>
                            )
                        }
                        )
                        }
                    </tbody>
                </table>
            </div>
            <div className={`rounded pt-1 pb-1 shadow ${styles.newdeck}`}>
                <h4>Don't see your topic? Add a new study deck <Link className="text-primary text-decoration-none" to="/decks/new">here</Link></h4>
            </div>
        </div>
    );
};

export default Main;