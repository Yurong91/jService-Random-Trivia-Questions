import axios from 'axios';
import React from 'react';
import './App.css';
import {useState} from 'react';
import QuestionInfo from '../QuestionInfo/QuestionInfo';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';



function App() {

  //state hooks
  const [questionRandom,setQuestionRandom] = useState([])
  const [questionInfo,setQuestionInfo] = useState([])

  //scores
  const [score, setScore] = useState(0)
  
  //questionObject
  const [questionObj, setQuestionObj] = useState({
    question:"",
    answer:"",
    category:"",
    points:0,
    showQuestion:false
  })

  const [showQuestion, setShowQuestion] = useState(false)

  const handleSubmitResetScore =(e) => {
    setScore(0)
  }

  const handleScore =(e) => {
    let temp = questionObj.points;
    const tempScore = score + (e.target.name === "inc" ? temp : temp * -1);
    setScore(tempScore);
    console.log(e.target.name);
    console.log(e.target.name === 'inc' ? temp: temp * -1)
  
  }

  const handleToggle =(e) => {
    setShowQuestion(!showQuestion)
    setQuestionObj({...questionObj, showQuestion: !showQuestion })
  }
  
 //set new questions with handleSubmit 
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setShowQuestion(false)
    const baseUrl='http://jservice.io/api/random';

    try {
      // const response= await axios.get(baseUrl+questionRandom)
      // setQuestionRandom(response.data)
      // console.log('responseData',response.data)
        const result = await fetch(baseUrl);
        const data = await result.json();
        // console.log('hello');
        console.log(data);
        if (!data[0].value || !data[0].answer || !data[0].question || !data[0].category.title) {
        handleSubmit();
        } else {
          const obj = {
            question: data[0].question,
            answer: data[0].answer,
            category: data[0].category.title,
            points: data[0].value,
            showQuestion: false
          }
          setQuestionObj(obj);
     }
      
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      <h1>Welcome to Jeopardy</h1>
      <h2>Score: {score}</h2>
      <div>
        <Box  minWidth={(theme) => theme.breakpoints.values.lg}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
            maxWidth: 1,
            height: 800,
            borderRadius: 1,
          }}
        >
          <Paper elevation={24}
            sx={{
              display: 'flex',
              maxWidth: .8,
              minWidth:.8,
              height: 600,
              p:1,
              alignContent: 'center',
              justifyContent: 'center',
              bgcolor: '#2E98BB',
            }}>
            <div>
              <h1>Score: {score}</h1>
              {
                showQuestion ?
                  <div className='right-wrong-container'>
                    <Button variant="contained" onClick={handleScore} color="success" name="inc">Got It Right</Button>
                    <Button variant="contained" onClick={handleScore} color="error" name="dec">Got It Wrong</Button>
                  </div>
                  :
                  <div>
                  </div>
              }
              <p />
              <div className='center-btn-container'>
                <Button variant="contained" onClick={handleSubmit}>Get A Random Trivia Question</Button>
              </div>
              <QuestionInfo questionObj={questionObj} handleToggle={handleToggle} /> 
              <div className='reset-score-btn'>
                {
                  score !== 0 && <Button variant="contained" onClick={handleSubmit}>Reset Score</Button>
                }
              </div>
      
      </div>
          </Paper>
        </Box>
      </div>

      
    </div>
  );
}

export default App;
