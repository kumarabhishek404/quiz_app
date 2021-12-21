import Axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import styles from '../styles/score.module.css'

const Score = () => {
  const [wrongAttempts, setWrongAttempts] = useState()
  const [name, setName] = useState()

  useEffect(() => {
    setName(Router?.query?.name)
    setWrongAttempts(Router?.query?.w)
  },[])
  const handleRetry = () => {
    Router.push('/')
  }

  return (
    <div className={styles.container}>
      <h1>Score</h1>
      <div className={styles.scoreBox}>
        <h2 className={styles.heading}>Name : {name || '-'}</h2>
        <h3>No. of wrong attempt : {wrongAttempts || '-'}</h3>
      </div>
      <button className={styles.button} onClick={handleRetry}>Retry</button>
    </div>
  )
}

export default Score;