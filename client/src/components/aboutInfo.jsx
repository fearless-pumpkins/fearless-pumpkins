import React from 'react';
import styles from '../../styles/aboutInfo.css';

const AboutInfo = (props) => {
  return (
    <div className={styles.about}>
      <div className={styles.topic}>
        <a>Let's talk <i>politics...</i></a>
      </div>
      <div className={styles.description}>
        <ul>
          <li>Input a Twitter username of a person on whom you'd like to gain some insight</li>
          <li>The app will retrieve some information about that Twitter account such as tweets, friends, mentions and etc.</li>
          <li>Perform analysis of friends and tweets</li>
          <li>Based on results of analysis, the app will determine how Democrat or Republican the user is</li>
        </ul>
      </div>

    </div>
  );
};

export default AboutInfo;
