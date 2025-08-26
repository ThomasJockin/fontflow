"use client"

import {useState} from "react";
 
export default function Page() {
     const [userAnswer, storeAnswer] = useState(null);
const check = userAnswer === "ai";
    
    let response = "img-item"; // Default class
    if (userAnswer === null) {
        response = "img-item";
    } else if (check) {
        response = "img-item-yes";
    } else {
        response = "img-item-no";
    }

         function Answer({ choice, actualAnswer }) {
    if (choice === null) {
        return null;
    }

    if (choice === actualAnswer) {
        return <div><label className="exhibitanswer">Yes. This is <strong>{actualAnswer}</strong>.</label></div>;
    }

    return <div><label className="exhibitanswer">Nope. This is <strong>{actualAnswer}</strong>. </label></div>;
}
  return (
    <div className="exhibitshow">
            <div className="response-buttons">
            <button onClick={() => storeAnswer("human")}disabled={userAnswer !== null}>Human</button>
            <button id="ai"  onClick={() => storeAnswer("ai")}disabled={userAnswer !== null}>Ai</button>
            </div>
            <Answer choice={userAnswer} actualAnswer={"ai"} />
    </div>
      ) 

 
}