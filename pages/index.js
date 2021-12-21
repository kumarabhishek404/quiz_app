import React, { useState } from 'react'
import Router from 'next/router'
import styles from '../styles/welcome.module.css'

const Welcome = () => {
  const [name, setName] = useState()
  const [isValid, setIsValid] = useState(false)

  const handleNext = () => {
    Router.push(`/questions?name=${name}`)
  }

  const handleEnterName = (name) => {
    setName(name)
    if (name == '') {
      setIsValid(false)
    }
    else {
      setIsValid(true)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <div className={styles.nameBox}>
        <input
          className={styles.inputField}
          type='text'
          onChange={(e) => handleEnterName(e.target.value)}
          placeholder='Enter Your Name' />
        <button
          className={styles.button}
          disabled={!isValid}
          onClick={handleNext}>
          Next
        </button>
      </div>
      <style jsx>
        {`

        `}
      </style>
    </div>
  )
}

export default Welcome;