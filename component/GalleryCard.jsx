"use client"

import {useState} from "react";

function GalleryCard(prompt) {
    
  const [userAnswer, storeAnswer] = useState(null);
    const check = userAnswer === prompt.user_type;
    
    let response = "img-item"; // Default class
    if (userAnswer === null) {
        response = "img-item";
    } else if (check) {
        response = "img-item-yes";
    } else {
        response = "img-item-no";
    }

    return (
        <div className="galleryshow">
            <img className={response} src={prompt.img_url} alt="Generated Prompt" />
            <div className="response-buttons">
            <button onClick={() => storeAnswer("human")}disabled={userAnswer !== null}>Human</button>
            <button id="ai"  onClick={() => storeAnswer("ai")}disabled={userAnswer !== null}>Ai</button>
            </div>
            <Answer choice={userAnswer} actualAnswer={prompt.user_type} />

            <div className="gallery-text">
                <label>Prompt: </label>{prompt.vibe} but {prompt.action} along with a {prompt.layout} layout
            </div>
            <div className="gallery-text">
                <span className="BigLetter">Aa</span>
                <label>Headline: </label>{prompt.header_font} but make the {prompt.langObject} {prompt.relation} the {prompt.attribute}
            </div>
            <div className="gallery-text">
                <span className="SmallLetter">Aa</span>
                <label>Subhead: </label>{prompt.subhead_font} but also make it {prompt.relation} the {prompt.fontProperty} of the {prompt.content}
            </div>
        </div>
    );
}

export default GalleryCard;

function Answer({ choice, actualAnswer }) {
    if (choice === null) {
        return null;
    }

    if (choice === actualAnswer) {
        return <div><label>Correct. This is <strong>{actualAnswer} made</strong>.</label></div>;
    }

    return <div><label>Nope. This is <strong>{actualAnswer} made</strong>. </label></div>;
}