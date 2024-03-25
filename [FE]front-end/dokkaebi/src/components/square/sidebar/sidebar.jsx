import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      {/* 사이드바 내용 */}
      <nav>
        <div className={styles.menuBox}>
          <div className={styles.menu}>친구 추가</div>
          <div className={styles.menu}>알림</div>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;
