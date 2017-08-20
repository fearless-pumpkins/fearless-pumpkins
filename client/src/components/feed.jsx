import React from 'react';
import styles from '../../styles/feed.css';
import AboutInfo from './aboutInfo.jsx';
import FeedInfo from './feedInfo.jsx';

const Feed = (props) => {

  // If Feed tag is clicked, change the style of the About button
  // to default and update the style of the Feed button
  var handleFeedClick = function() {
    document.getElementById('aboutButton').classList.remove(styles.button_focus);
    document.getElementById('feedButton').classList.add(styles.button_focus);
    props.handleFeedAboutClick('feed');
  };

  // If About button is clicked, bring feed button back to default
  // and update About button style
  var handleAboutClick = function() {
    document.getElementById('feedButton').classList.remove(styles.button_focus);
    document.getElementById('aboutButton').classList.add(styles.button_focus);
    props.handleFeedAboutClick('about');
  };

  // Conditional rendering based on the status of the feed card
  // that is coming from the main app component via Landind component
  let information = '';
  if (props.feed === 'feed') {
    information = <FeedInfo topTen={props.topTen}/>;
  } else {
    information = <AboutInfo />;
  }

  return (
    <div className={styles.feed}>
      <div className={styles.feed_title}>
        <button id='feedButton' onClick={handleFeedClick}>Feed</button>
        <button id='aboutButton' className={styles.button_focus} onClick={handleAboutClick}>About</button>
      </div>
      {information}
    </div>
  )

};

export default Feed;
