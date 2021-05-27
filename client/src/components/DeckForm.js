import React from 'react';

const DeckForm = (props) => {
    const {deck, setDeck, onSubmitProp} = props;
    return (
        <form onSubmit={onSubmitProp}>
            <p>
                <label className="form-label text-light">Name</label><br/>
                <input
                    type="text" 
                    name="name" value={deck.name} className="form-control shadow"
                    onChange={(e) => { setDeck({...deck, name: e.target.value}) }}/>
            </p>
            <p>
                <label className="form-label text-light">Topic</label><br/>
                <input
                    type="text" 
                    name="topic" value={deck.topic} className="form-control shadow"
                    onChange={(e) => { setDeck({...deck, topic: e.target.value}) }}/>
            </p>
            <p>
                <label className="form-label text-light">Creator</label><br/>
                <input
                    type="text" 
                    name="creator" value={deck.creator} className="form-control shadow"
                    onChange={(e) => { setDeck({...deck, creator: e.target.value}) }}/>
            </p>
            <input type="submit" value="Create Deck" className="btn btn-primary shadow"/>
        </form>
    )
}

export default DeckForm;