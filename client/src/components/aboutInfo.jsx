import React from 'react';
import styles from '../../styles/aboutInfo.css';

const AboutInfo = (props) => {
  return (
    <div className={styles.about}>
      <p>Input a Twitter username of a person on whom you'd like to gain some
      insight. The app will retrieve some information about that Twitter account
      such as tweets, friends, mentions and etc using Twitter API and then perform
      a lexical analysis of tweets using Google Cloud Natural Language API. Based
      on the analysis of tweets and analysis of friends performed by our app, the
      app will estimate how influenced the given person is by the two political
      parties: Democrat and Republican.</p>
    </div>
  );
};

export default AboutInfo;
