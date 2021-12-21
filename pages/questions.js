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
  PANTHER,
  BAT,
  BIKE,
  CAR,
  BUTTERFLY,
  DONKEY,
  PARROT,
  GAMEOVER,
} from '../lib/config';

const questionsList = [
  {
    image: LION,
    options: ["Goat", "Lion", "Leopard"],
    answer: 'Lion'
  },
  {
    image: TIGER,
    options: ["Monkey", "Crocodile", "Tiger"],
    answer: 'Tiger'
  },
  {
    image: ELEPHANT,
    options: ["Cow", "Elephant", "Aligator"],
    answer: 'Elephant'
  },
  {
    image: DEER,
    options: ["Buffalo", "Deer", "Hen"],
    answer: 'Deer'
  },
  {
    image: WOLF,
    options: ["Wolf", "Parrot", "Peacock"],
    answer: 'Wolf'
  },
  {
    image: PANTHER,
    options: ["Cat", "Panther", "Dog"],
    answer: 'Panther'
  },
  {
    image: BAT,
    options: ["Book", "Bat", "Snake"],
    answer: 'Bat'
  },
  {
    image: BIKE,
    options: ["Bike", "Pen", "Truck"],
    answer: 'Bike'
  },
  {
    image: CAR,
    options: ["Cycle", "Car", "Train"],
    answer: 'Car'
  },
  {
    image: BUTTERFLY,
    options: ["Lizard", "Ziraff", "Butterfly"],
    answer: 'Butterfly'
  },
  {
    image: DONKEY,
    options: ["Donkey", "Horse", "Ox"],
    answer: 'Donkey'
  },
  {
    image: PARROT,
    options: ["Crow", "Pigeon", "Parrot"],
    answer: 'Parrot'
  },
]

const Question = () => {
  const [currQuestion, setCurrQuestion] = useState(questionsList[0])
  const [attemptQuestion, setAttemptQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState()
  const [currAnswers, setCurrAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [currect, setCurrect] = useState(false)
  const [isWrong, setIsWrong] = useState(false)

  const handleNext = () => {
    if (currect) {
      var chooser = HandleRandomQuestion(questionsList);
      setCurrQuestion(chooser())
      // const ques = Math.floor(Math.random() * questionsList.length)
      // setCurrQuestion(questionsList[ques])
      console.log(chooser());
      setAttemptQuestion(prev => prev + 1)
    }
  }

  useEffect(() => {
    var chooser = HandleRandomQuestion(questionsList);
    setCurrQuestion(chooser())
  }, [])

  const handleOption = (answer) => {
    const currectAnswer = currQuestion.answer
    setSelectedOption(answer)
    if (answer === currectAnswer) {
      setCurrAnswers(prev => prev + 1)
      setCurrect(true)
      setIsWrong(false)
    }
    else {
      setWrongAnswers(prev => prev + 1)
      setCurrect(false)
      setIsWrong(true)
    }
  }

  const handleSubmit = () => {
    Router.push(`/score?name=${Router.query.name}&w=${wrongAnswers}`)

    const data = {
      name: Router.query.name,
      wrong: wrongAnswers,
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      "Access-Control-Allow-Origin": "*"
    }

    Axios.post(
      'https://project--quizapp.herokuapp.com/score',
      data,
      { headers })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const HandleRandomQuestion = (array) => {
    var copy = array.slice(0);
    console.log(copy);
    return function () {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }

  return (
    <div className={styles.container}>
      {
        attemptQuestion < 5
          ? <>
            <h1>Questions</h1>
            <h3>Did you know this picture?</h3>
            <div className={styles.questionBox}>
              <h3>{currQuestion.question}</h3>
              <figure className={styles.figureBox}>
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
              {
                isWrong && <p className={styles.errorText}>Wrong Answer Try Again!</p>
              }
            </div>
          </>
          : <>
            <div className={styles.gameOver}>
              <h1 className={styles.gamerOverText}>Game Over</h1>
              <figure>
                <img className={styles.image} src={GAMEOVER} />
              </figure>
              <h2 className={styles.gamerOverText}>You have completed your 5 questions</h2>
            </div>
          </>
      }

      <div className={styles.buttonBox}>
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