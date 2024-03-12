// import React from 'react'
// import styles from './Chat.module.css'
import ChattingSelectorList from './ChattingSelectorList'
import styles from './ChattingSelector.module.css'
import { useState } from 'react'

export default function Chat() {
  const [isDropdownView, setDropdownView] = useState(false)

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView)
  }

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false)
    }, 200);
  }

  return (
    <div className={styles.container} onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button>전체 채팅{isDropdownView ? '▲' : '▼'}</button>
      </label>
      {isDropdownView && <ChattingSelectorList /> }
    </div>
  )
}
