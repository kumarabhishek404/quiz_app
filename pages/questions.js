import Router from "next/router";
import Axios from "axios";
import react, { useEffect, useState } from "react";
import styles from '../styles/question.module.css';
import {
  LION,
  TIGER,
  ELEPHANT,
  DEER,
  WOLF,
  PANTHER
} from '../lib/config';

const questionsList = [
  {
    image: LION,
    options: ["Goat", "Lion", "Tiger"],
    answer: 'Lion'
  },
  {
    image: TIGER,
    options: ["Elephant", "Lion", "Tiger"],
    answer: 'Tiger'
  },
  {
    image: ELEPHANT,
    options: ["Deer", "Elephant", "Tiger"],
    answer: 'Elephant'
  },
  {
    image: DEER,
    options: ["Buffalo", "Deer", "Goat"],
    answer: 'Deer'
  },
  {
    image: WOLF,
    options: ["Wolf", "Lion", "Deer"],
    answer: 'Wolf'
  },
  {
    image: PANTHER,
    options: ["Lion", "Panther", "Wolf"],
    answer: 'Panther'
  },
]

const Question = () => {
  const [currQuestion, setCurrQuestion] = useState(questionsList[Math.floor(Math.random() * questionsList.length)])
  const [attemptQuestion, setAttemptQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState()
  const [currAnswers, setCurrAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  const handleNext = () => {
    const ques = Math.floor(Math.random() * questionsList.length)
    setCurrQuestion(questionsList[ques])
    setAttemptQuestion(prev => prev + 1)
  }

  const handleOption = (answer) => {
    const currectAnswer = currQuestion.answer
    setSelectedOption(answer)
    if (answer === currectAnswer) {
      setCurrAnswers(prev => prev + 1)
    }
    else {
      setWrongAnswers(prev => prev + 1)
    }
  }

  const handleSubmit = () => {
    Router.push(`/score?name=${Router.query.name}`)
    const data = {
      name: Router.query.name,
      currect: currAnswers,
      wrong: wrongAnswers,
      attempt: attemptQuestion
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      "Access-Control-Allow-Origin": "*"
      // crossdomain: true
    }
    Axios.post('http://localhost:5000/score', data, { headers })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.container}>
      <h1>Question</h1>
      <h3>Did you know this animal?</h3>
      <div>
        <h3>{currQuestion.question}</h3>
        <figure>
          <img className={styles.image} src={currQuestion.image} />
        </figure>
        <div className={styles.optionBox}>
          {
            currQuestion.options.map((option, index) => (
              <p
                key={index}
                className={`${selectedOption == option ? 'active' : ''} ${styles.option}`}
                onClick={() => handleOption(option)}>
                {option}
              </p>
            ))
          }
        </div>
      </div>
      <div>
        {
          attemptQuestion < 5
            ? <button className={styles.button} onClick={handleNext}>Next</button>
            : <button className={styles.button} onClick={handleSubmit}>Submit</button>
        }
      </div>
      <style jsx>
        {`
          .active {
            background: #354753;
          }
        `}
      </style>
    </div>
  )
}

export default Question;