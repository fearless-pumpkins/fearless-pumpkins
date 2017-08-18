import React from 'react';
import styles from '../../styles/loading.css';

const Loading = (props) => {
  var phrases = [
    'Playing with cats...',
    'Gathering data...',
    'Arranging gnomes...',
    'Pouring tea...',
    'Crunching numbers...',
    'Calculating everything...',
    'Scratching my head...',
    'Jumping rope...',
    'Drinking coffee...',
    'Shacking head...',
    'Looking for silly sentence...',
    'This is not a placeholder...'
  ];

  var randomIndexPhrase = function() {
    return Math.floor(Math.random() * (phrases.length - 1));
  };

  var getRandomPhrase = function() {
    if (document.getElementById(styles.phrase)) {
      document.getElementById(styles.phrase).innerHTML = phrases[randomIndexPhrase()];
      document.getElementById(styles.phrase).classList.add(styles.on_phrase_show);
    }
  };

  var randPhrase = setInterval(function() {
    if (document.getElementById(styles.phrase)) {
      getRandomPhrase();
    }
  }, 2000);

  setTimeout(function() {
    clearInterval(randPhrase);
    if (document.getElementById(styles.phrase)) {
      document.getElementById(styles.phrase).innerHTML = 'Loading...';
    }
  }, 10000);


  return (
    <div className={styles.loading_card}>
      <div className={styles.loading_animation}>
        <div className={styles.animation}></div>
      </div>
      <div id={styles.phrase}></div>
    </div>
  )
};

export default Loading;
