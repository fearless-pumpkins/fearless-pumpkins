import React from 'react';
import styles from '../../styles/loading.css';

const Loading = (props) => {
  return (
    <div className={styles.loading_card}>
      <div className={styles.loading_animation}>
        <div className={styles.animation}></div>
      </div>
    </div>
  )
};

export default Loading;
