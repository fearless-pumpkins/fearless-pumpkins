import React from 'react';
import styles from '../../styles/loading.css';

const Loading = (props) => {
  return (
    <div className={styles.loading_card}>
      <div>
        <h1>Loading...</h1>
      </div>
    </div>
  )
};

export default Loading;
