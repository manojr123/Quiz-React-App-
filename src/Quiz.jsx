import React, {useState, useEffect } from 'react'

let highscores = []
let id = 0
let result=""

const Quiz = (props) => {

    const questions = props.questions
    const [currentQues, setCurrentQues ] = useState(0)
    const [quizActive, setQuizActive] = useState(false)
    const [timeOver, setTimeOver] = useState(false)
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(0)
    const [displayScore, setDisplayscore] = useState(false)
    const [displayHighscores, setDisplayHighscores] = useState(false)
    const [buttonEnabled, setButtonEnabled] = useState(true)
    let initial = ""
 
function startQuizFn () {
    setQuizActive(active => !active )
    setTimeOver(false )

    setTime(50)

    id = setInterval( () => {
            console.log('time', time)
            setTime(time=>time-1)
        }, 1000 )
}

function nextQuestion(event) {
    setButtonEnabled(true)
    if ( currentQues < questions.length-1) {
        setCurrentQues(currentQues => currentQues+1 )
    } else {
        setDisplayscore(true)
        clearInterval(id)
    }
    result = ""
}

function verifyAnswer (event) {
    if (buttonEnabled) {
        if (event.target.innerText === questions[currentQues].answer )  {
            setScore(score=> score +50 )
            result='Correct'
        } else {
            result='Incorrect'
            setTime(time=>time-5)
        }
        setButtonEnabled(false)
    }
}

useEffect( () => {

}, [currentQues, time])

function displayHighscoresFn () {
    setDisplayHighscores(true)
}
 

 return (
    <body className="main">
        <div className="header">
            <p onClick={displayHighscoresFn}> View Highscores!  </p>
            <p> Time : {time}</p>
            
        </div>
    <section className="section">
        <div className="display">
        { !quizActive && !displayScore && !displayHighscores ?<div>
            <h1> Coding Quiz Challenge </h1>
            <p> Try to answer to following code related questions within the time limit </p>
            <p> Keep in mind that incorrect answers will penalize your score/time by 5 seconds ! </p>
            <button className="button" onClick={startQuizFn}> Start Quiz </button>
            </div>
        :null 
        }

        </div>



        <div>
            {quizActive && !displayScore && !displayHighscores? 
                <div className="questions">
                        <h1> {questions[currentQues].questionText} </h1>
                        <p className="options" onClick={verifyAnswer}> 
                                {questions[currentQues].options[0]}  </p>
                        <p className="options" onClick={verifyAnswer}> 
                                {questions[currentQues].options[1]}  </p>
                        <p className="options" onClick={verifyAnswer}>
                                 {questions[currentQues].options[2]}  </p>
                        <p className="options" onClick={verifyAnswer}> 
                                {questions[currentQues].options[3]}  </p>
                        <p> Result : {result} </p>
                        <button className="button" onClick={nextQuestion} > Next </button>
                </div>
                :null
            }
        </div>
        <div>

        {displayScore ?
            <div>
            <h1> All Done ! </h1>
            <p> Your final score is : {score}</p>
            <label > Enter initials : </label>
            <input type="text" onChange={(event) => {
                initial = event.target.value
                
            }}
            />
            <button className="button" onClick={ (event) => {
                    setDisplayscore(false)
                    setQuizActive(active => !active)
                    setCurrentQues(0);
                    setScore(0);
                    setTime(0)
                    let obj = {}
                    obj.name = initial
                    obj.score = score
                    highscores.push(obj)
            } }> Go Back </button>
            </div>
        :null }
        </div>
 
        <div>
        { displayHighscores ?
            <div>
                <h1> Highscores </h1>
                {highscores.map( (item, index) => {
                    return <p> {index+1}.  {item.name} - {item.score} </p>
                })}
                <button className="button" 
                onClick={()=>setDisplayHighscores(false)} > Go Back </button>
                
            </div>
            : null
        }
        </div>
    </section>
    </body>


 )

}

export default Quiz

