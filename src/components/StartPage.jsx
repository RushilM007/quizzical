import React from "react"

export default function StartPage(props){
    return (
        <>
            <div id = "startPage">
            <div className = "blob-light-yellow"></div>
            <h1>Quizzical</h1>
            <button onClick = {props.toggleStartQuiz}>Start Quiz</button>
            <div className = "blob-light-blue"></div>
        </div>
       
        </>
        
    )
}