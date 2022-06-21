import React from 'react'
import Button from '@mui/material/Button';

const QuestionInfo = ({questionObj, handleToggle}) => {
    console.log(questionObj.question === "" ? "click to play" : "playing");
    return (
        <div>
            {
                questionObj.question === "" ?
                <h1>Click button to play!</h1>
            :
               <div>
                 <h1>Answer: {questionObj.question}</h1>
                 <h1>Category: {questionObj.category}</h1>
                 <h1>Points: {questionObj.points}</h1>
                 <form>
                 <Button onClick={handleToggle}>Show Question</Button>
                </form>
                {questionObj.showQuestion && <h1>Question:{questionObj.answer}</h1>}
                </div>
            }
        </div>
    )
    
}

export default QuestionInfo;