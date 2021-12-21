import Axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import styles from '../styles/score.module.css'

const Score = () => {
  const [score, setScore] = useState()

  useEffect(() => {
    Axios.get('http://localhost:5000/score')
      .then(res => {
        console.log(res)
        const data = JSON.parse(res.data)
        const result = data.filter(score => score.name == Router.query.name)
        setScore(result)
        console.log(result, Router.query.name);
      }
      )
      .catch(err =>
        console.log(err)
      )
  }, [])

  const handleRetry = () => {
    Router.push('/')
  }

  return (
    <div className={styles.container}>
      <h1>Score</h1>
      <div className={styles.scoreBox}>
        <h2 className={styles.heading}>Name : {score?.name || '-'}</h2>
        <p>No. of attempts : {score?.attempt || '-'}</p>
        <p>No. of currect answer : {score?.currect || '-'}</p>
        <p>No. of wrong answer : {score?.wrong || '-'}</p>
      </div>
      <button className={styles.button} onClick={handleRetry}>Retry</button>
    </div>
  )
}

export default Score;