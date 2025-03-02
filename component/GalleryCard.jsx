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
                <Prompt{...prompt}/>
                
            </div>
            <div className="gallery-text">
                <span className="BigLetter">Aa</span>
                <Headline{...prompt} />
               
            </div>
            <div className="gallery-text">
                <span className="SmallLetter">Aa</span>
               <Subhead{...prompt} />
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

function Prompt({level, action, vibe, layout}) {
    switch(level) {
        case 3:
            return(
                <span>
                <label>Prompt: </label>{vibe} but {action} along with a {layout} layout
                </span>  
                )
                
        case 2:
            return (
            <span>
            <label>Prompt: </label>{action} along with a {layout} layout
            </span>
            )
        case 1:
            return(
                <span>
                <label>Prompt: </label> a {layout} layout
                </span>
            )
                }
}

function Headline({level,header_font, lang_object,relation, attribute}){
    switch(level) {
        case 3:
            return(
            <span>
                 <label>Headline: </label>{header_font} but make the {lang_object} {relation} the {attribute}
            </span>
            )
        case 2:
            return(
            <span>
                 <label>Headline: </label>{header_font} but make the {lang_object} {relation} the {attribute}
                
            </span>
            )
        case 1:
            return(
            <span>
                 <label>Headline: </label>{header_font} 
            </span>
            )
                }
    
}

function Subhead({level,subhead_font,font_property,relation, content}){
    switch(level) {
        case 3:
            return(
            <span>
                <label>Subhead: </label>{subhead_font} but also make it {relation} the {font_property} of the {content}
            </span>
            )
        case 2:
            return(
            <span>
                <label>Subhead: </label>{subhead_font} 
            </span>
            )
        case 1:
            return(
            <span>
                <label>Subhead: </label>{subhead_font} 
            </span>
            )
                }
    
}