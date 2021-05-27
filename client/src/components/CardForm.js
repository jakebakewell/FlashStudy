import React from 'react';

const CardForm = (props) => {
    const {card, setCard, onSubmitProp} = props;
    return (
        <form onSubmit={onSubmitProp}>
            <p>
                <label className="form-label text-light">Card Front</label><br/>
                <input
                    type="text" 
                    name="frontText" value={card.frontText} className="form-control shadow"
                    onChange={(e) => { setCard({...card, frontText: e.target.value}) }}/>
            </p>
            <p>
                <label className="form-label text-light">Card Back</label><br/>
                <input
                    type="text" 
                    name="backText" value={card.backText} className="form-control shadow"
                    onChange={(e) => { setCard({...card, backText: e.target.value}) }}/>
            </p>
            <input type="submit" value="Submit Card" className="btn btn-primary shadow"/>
        </form>
    )
}

export default CardForm;