import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import styles from './studydeck.module.css';
import io from 'socket.io-client';

const StudyDeck = (props) => {
    const [cardFace, setCardFace] = useState("frontText");
    const [indexNumber, setIndexNumber] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [deck, setDeck] = useState({
        name: "",
        topic: "",
        creator: "",
        cards: []
    });
    const [socket] = useState(() => io(":8000"));
    const [message, setMessage] = useState({
        text: "",
        sender: "",
        roomId: ""
    });
    const [chat, setChat] = useState([]);
    const [roomInfo, setRoomInfo] = useState({
        roomId: "",
        roomName: ""
    })
    const [chatJoined, setChatJoined] = useState(false);
    useEffect(() => {
        console.log("The client side of the socket is all good");
        socket.on('chat', input => {
            setChat(prevChat => {return [...prevChat, input]});
        })
        return () => socket.disconnect(true);
    }, [socket]);
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/decks/${props.id}`)
            .then(res=>{
                console.log(res.data.results);
                setDeck(res.data.results);
                setRoomInfo({roomId: res.data.results._id, roomName: res.data.results.name});
                console.log("Room Info");
                console.log(roomInfo);
                setMessage({...message, roomId: res.data.results._id});
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [props.id]);
    const previousCard = () => {
        if (indexNumber > 0) {
            setIndexNumber(indexNumber - 1);
            setCardFace("frontText");
        }
        else {
            console.log("Can't reference before 0 index in card array");
        }
    }
    const nextCard = () => {
        if (indexNumber < deck.cards.length - 1) {
                setIndexNumber(indexNumber + 1);
                setCardFace("frontText");
            
        }
        else {
            console.log("Can't reference after last index in card array");
            
        }
    }
    const flipCard = () => {
        if (cardFace === "frontText") {
            setCardFace("backText");
        }
        else {
            setCardFace("frontText");
        }
    }
    const submitHandler = e => {
        e.preventDefault();
        socket.emit('chatMessage', message);
        setMessage({...message, text: ""});
    }
    const joinChat = () => {
        socket.emit('joinChat', roomInfo);
        setChatJoined(!chatJoined);
    }
    const leaveChat = () => {
        socket.emit('leaveChat', roomInfo);
        setChatJoined(!chatJoined);
    }
    return (
        <div>
            <div className={`d-flex justify-content-center shadow pt-1 pb-1 text-light ${styles.headerbackground}`}>
                <h2 className={`fs-1 ${styles.headermargin}`}>{deck.name}</h2>
                <h3 className={styles.headermargin}>Topic: {deck.topic}</h3>
            </div>
            <h4 className={`text-light ${styles.createdby}`}>Deck created by: <span className="text-info">{deck.creator}</span></h4>
            <div className={`text-light ${styles.progresscount}`}>
                <h3>Studied <span className="text-info">{indexNumber + 1}</span> out of <span className="text-info">{deck.cards.length}</span> cards</h3>
            </div>
            <div className="container">
                <div className={`${styles.chatcontainer}`}>
                    {chatJoined ? 
                    <div className={`d-flex flex-column`}>
                        <div className={`bg-light rounded shadow ${styles.chatdiv}`}>
                            {
                            chat.map( (message, idx) => {
                                return (
                                    <>
                                    {idx%2===0 ? 
                                        <div className="rounded shadow bg-success w-50 text-center p-1 mb-4" key={idx}>
                                            <p className="fw-bold">{message.text}</p>
                                            <p>From: <span className="fw-bold">{message.sender}</span></p>
                                        </div>
                                        : 
                                        <div className={`rounded shadow bg-primary w-50 text-center p-1 mb-4 ${styles.bluemessage}`} key={idx}>
                                        <p className="fw-bold">{message.text}</p>
                                        <p>From: <span className="fw-bold">{message.sender}</span></p>
                                        </div>
                                    }
                                    </>
                                )
                            })
                            }
                        </div>
                        <div className={`container ${styles.chatbox}`}>
                            <form onSubmit={submitHandler}>
                                <label className="form-label text-light">Message</label><br/>
                                <input onChange={(e) => setMessage({...message, text: e.target.value})} className="form-control shadow" type="text" name="message"/>
                                <label className="form-label text-light">Sender</label><br/>
                                <input onChange={(e) => setMessage({...message, sender: e.target.value})} className="form-control shadow" type="text" name="sender"/>
                                <input type="submit" value="Send" className={`btn shadow btn-primary mt-3`}/>
                            </form> 
                            <button onClick={leaveChat} className={`btn shadow btn-danger mt-3`}>Leave Study Chat</button>
                        </div>
                    </div> : 
                    <button onClick={joinChat} className={`btn btn-success shadow ${styles.joinbutton}`}>Join Study Chat</button>}
                </div>
                <div className={`d-flex justify-content-end ${styles.cardsdiv}`}>
                    <img className={`${styles.leftarrow}`} onClick={previousCard} src="https://d29fhpw069ctt2.cloudfront.net/icon/image/39096/preview.png" alt="left arrow"/>
                    {loaded ? 
                        <div className={`rounded shadow d-flex justify-content-evenly ${styles.cards}`}>
                        <div>
                            {cardFace === "frontText" ? <p className="mb-5 text-center">{deck.cards[indexNumber].frontText}</p> : <p className="mb-5 text-center">{deck.cards[indexNumber].backText}</p>}
                            <button onClick={flipCard} className={`btn btn-dark`}>Flip Card</button>
                        </div>
                        </div> : 
                        <p>Loading...</p>}
                        <img className={`${styles.rightarrow}`} onClick={nextCard} src="https://d29fhpw069ctt2.cloudfront.net/icon/image/39097/preview.png" alt="right arrow"/>
                </div>
            </div>
            <div className={`${styles.homebutton}`}>
                <Link className={`text-light shadow fw-bold rounded-circle bg-info p-4 text-decoration-none`} to="/">Home</Link>
            </div>
        </div>
    );
};

export default StudyDeck;