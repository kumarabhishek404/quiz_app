import React, { useState } from 'react'
import Router from 'next/router'
import styles from '../styles/welcome.module.css'

const Welcome = () => {
  const [name, setName] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isNameEnter, setIsNameEnter] = useState(false)

  const handleNext = () => {
    if (name != '') {
      Router.push(`/questions?name=${name}`)
      setIsValid(true)
    }
    else {
      setIsNameEnter(true)
      setIsValid(false)
    }
  }

  const handleEnterName = (name) => {
    setName(name)
    if (name == '') {
      setIsNameEnter(true)
      setIsValid(false)
    }
    else {
      setIsNameEnter(false)
      setIsValid(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.formBoxHeading}>Quiz App</h1>
        <div className={styles.nameBox}>
          <input
            className={styles.inputField}
            type='text'
            onChange={(e) => handleEnterName(e.target.value)}
            placeholder='Enter Your Name' />
          {
            isNameEnter && <p className={styles.errorText}>Please enter your name</p>
          }
          <button
            className={styles.button}
            onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome;