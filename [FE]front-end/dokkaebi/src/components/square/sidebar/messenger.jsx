import React, { useState } from 'react';
import friendClose from '../../../images/backButton/friendBack.gif';
import styles from './messenger.module.css';

const Messenger = ({ selectedFriend, toggleMessageBar }) => {
  return (
    <aside className={styles.messenger}>
      <nav>
        <div className={`flex justify-between items-center ${styles.closeDiv}`}>
          <div>
            <span className={`text-md font-bold ml-1 ${styles.whoTalk}`}>{selectedFriend.nickName}</span>
            {/* <span className='text-sm'> 님과의 대화</span> */}
          </div>
          <button
            onClick={toggleMessageBar}
            className={`text-md font-bold text-black text-center ${styles.closeButton}`}
          >
            <img src={friendClose} alt="메신저닫기" className='ml-5' />
          </button>
        </div>
      </nav>
      
      {/* 선택된 친구의 이름 또는 정보를 표시 */}
      <nav>
        <div className={`flex flex-col overflow-y-auto ${styles.chatList}`}> 
          {/* 대화내역 */}
          <div>
            대화내역 보일 곳
          </div>
        </div>
      </nav>

      {/* 채팅 칠 곳 */}
      <nav>
        <div className={`flex justify-center items-center ${styles.inputDiv}`}>
          <form>
            <div className='flex justify-center'>
              <input
                type="text"
                className={styles.chatInput}
                // value={inputMessage}
              />
                <button
                  type="submit"
                  className={`${styles.inputButton} bg-red-300 text-sm font-bold`}
                >
                  입력
                </button>
            </div>
          </form>
        </div>
      </nav>
    </aside>
  );
};

export default Messenger;