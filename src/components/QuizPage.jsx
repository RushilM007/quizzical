import React from "react"
import he from "he"
import {clsx} from 'clsx'


export default function QuizPage(props){
    // These are all the options that the user clicks, stored in a dictionary 
    const [clickedAnswers, setClickedAnswers] = React.useState({});

    // Checks if 5 options are clicked 
    const [fiveOptionsClicked, setFiveOptionsClicked] = React.useState(false);

    // This counts the number of correct answers
    const [correctAnswersState, setCorrectAnswersState] = React.useState(0);

    //This checks the status of the quiz whether it is submitted or not.
    const [quizSubmitted, setQuizSubmitted] = React.useState(false);


    //This checks if there are 5 inputs from the user. 
    React.useEffect(()=>{
        if (Object.keys(clickedAnswers).length===5){
            setFiveOptionsClicked(true);
    }
    },[clickedAnswers])

    // Once the quiz is submitted this counts the number of correct answers. 
    React.useEffect(()=>{
        if (!props.questions.results) return;
        for (let i = 0; i <= 4; i ++){
            if (correctAnswersDict[i]===clickedAnswers[i]){
                setCorrectAnswersState(prev=>prev+1);
        }
    }

    },[quizSubmitted])


    // This function (sourced from the internet) is to shuffle the options for each question. 
    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    //This makes sure that the code only runs after all the required data from the API is fetched. 
    if (!props.questions.results){
        return <p>Loading...</p>
    }

    //This initializes a dictionary that stores all the correct values of the quiz 
    let correctAnswersDict = {};

    //This stores the correct answers for all the questions in a dictionary. 
    const correctAnswers = props.questions.results.map((question,questionIndex)=>{
        correctAnswersDict[questionIndex] = question.correct_answer;
    })

    //The code block below is to render all the questions and the options that the user is to select from

    const questions = props.questions.results.map((question, questionIndex)=>{

        let answers = []
        answers.push(question.correct_answer)
        answers.push(...question.incorrect_answers)

        const choices = answers.map((answer, answerIndex)=>{
            return <button disabled = {quizSubmitted}
            key = {answerIndex} onClick = {()=>setClickedAnswers(prev=>({
                ...prev,
                [questionIndex]:answer

            }))} className = {clsx(
                "optionsBeforeSelection",
                !quizSubmitted && clickedAnswers[questionIndex]===answer&&"optionsAfterSelection",
                quizSubmitted && correctAnswersDict[questionIndex]===answer&&"correctOptionSelected",
                quizSubmitted && clickedAnswers[questionIndex]===answer && correctAnswersDict[questionIndex]!==answer&&"wrongOptionSelected"
            
            )}>{he.decode(answer)}</button>
        })
        
        return (
            <>
            <h4 key = {questionIndex} className = "questions">{he.decode(question.question)}</h4>
            {choices}
            <hr></hr>
            </>
        )
    })

    //Clicking "Check answers" activates this function 
    //which changes state which leads to the score counting function being activated
    function submitQuizFunction(){
        setQuizSubmitted(prev=>!prev);
    }

    // This function reloads the page when the user clicks the "New Game" button
    function newGameButton(){
        window.location.reload();
    }

    return (
        <>
       <div id = "QuizPage">
         {questions}
        <div className = "blob-light-yellow-2"></div>
        <div className = "blob-light-blue-2"></div>
       </div>
       <div id = "footer">
       {quizSubmitted && <p id = "displayCorrectAnswers">{`You got ${correctAnswersState}/5 correct!`}</p>}
       {fiveOptionsClicked && <button id = "submitQuizButton" onClick = {!quizSubmitted?submitQuizFunction:newGameButton}>{!quizSubmitted?"Check Answers":"New Game"}</button>}
       </div>
        </>
    )
}