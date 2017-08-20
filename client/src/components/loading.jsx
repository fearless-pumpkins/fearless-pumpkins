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
    'This is not a placeholder...',
    'Zzz...',
    'Solving world problems...',
    'Creating a new universe...',
    'Shifting tables...'
  ];

  // Returns a random index from o to length of phrases array - 1
  var randomIndexPhrase = function() {
    return Math.floor(Math.random() * (phrases.length - 1));
  };

  // Adds a random phrase to the bottom of the loading page
  var getRandomPhrase = function() {
    if (document.getElementById(styles.phrase)) {
      document.getElementById(styles.phrase).innerHTML = phrases[randomIndexPhrase()];
      document.getElementById(styles.phrase).classList.add(styles.on_phrase_show);
    }
  };

  // Random phrase changes every 2 seconds
  var randPhrase = setInterval(function() {
    // Get a new random phrase only if div exists
    if (document.getElementById(styles.phrase)) {
      getRandomPhrase();
    }
  }, 2000);

  // Stop the rendering new random phrases if loading has been on for 10 seconds
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
