import React from "react"
import StartPage from "./components/StartPage.jsx"
import QuizPage from "./components/QuizPage.jsx"

export default function App(){
    const [startQuiz, setStartQuiz] = React.useState(false);
    const [apiData, updateAPIData] = React.useState([])

    function toggleStartQuiz(){
        setStartQuiz(prev=>!prev);
    }

    function fetchQuestionsFromAPI(){
       fetch("https://opentdb.com/api.php?amount=5")
        .then(response=>{
          if (!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
          } 
            return response.json();
        })
        .then(data=>{
          if ( data && data.response_code === 0){
            updateAPIData(data);
          } else {
            console.warn(`${data.response_code}`)
            handleAPIfailure(data.response_code);
          }
        })
        .catch(error=>{
          console.error("Failed to fetch trivia questions", error);
        })
    }

    React.useEffect(()=>{
      if (startQuiz){
        fetchQuestionsFromAPI();
      }
    }, [startQuiz])

  return (
    <>
    {!startQuiz && <StartPage toggleStartQuiz = {toggleStartQuiz} />}
    {startQuiz && <QuizPage apiData = {apiData}/>}
    </>
  )
}