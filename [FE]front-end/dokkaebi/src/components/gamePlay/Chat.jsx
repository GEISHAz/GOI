// import React from 'react'
import styles from './Chat.module.css'
import ChattingSelector from './ChattingSelector'

export default function Chat() {
  return (
    <div className={styles.chatComponents}>
      <div className={styles.chatArea}>
        <button className={styles.chattingSelector}><ChattingSelector /></button>
        <input type="text" className={styles.chatInput} />
      </div>
    </div>
  )
}
