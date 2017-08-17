import React from 'react';
import styles from '../../styles/feed.css';
import AboutInfo from './aboutInfo.jsx';
import FeedInfo from './feedInfo.jsx';

const Feed = (props) => {

  var handleFeedClick = function() {
    document.getElementById('aboutButton').classList.remove(styles.button_focus);
    document.getElementById('feedButton').classList.add(styles.button_focus);
    props.handleFeedAboutClick('feed');
  };

  var handleAboutClick = function() {
    document.getElementById('feedButton').classList.remove(styles.button_focus);
    document.getElementById('aboutButton').classList.add(styles.button_focus);
    props.handleFeedAboutClick('about');
  };

  return (
    <div className={styles.feed}>
    <div className={styles.feed_title}>
    <button id='feedButton' onClick={handleFeedClick}>Feed</button>
    <button id='aboutButton' className={styles.button_focus} onClick={handleAboutClick}>About Me</button>
    </div>
    {props.feed.information}
    </div>
  )

};

export default Feed;
