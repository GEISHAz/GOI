// import React from 'react'
import styles from './LobbyChat.module.css'
// import ChattingSelector from './ChattingSelector'


export default function LobbyChat() {
  return (
    <div className={styles.chatComponents}>
      <div className={styles.messageArea}>
        <span id="msgs"></span>
      </div>
      <div className={styles.chatArea}>
        <select id="to" className={styles.chatTo}>
          <option value="ALL">ALL</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input type="text" className={styles.chatInput} />
      </div>
      {/* <div className={styles.chatArea}>
      </div> */}
    </div>
  )
}
