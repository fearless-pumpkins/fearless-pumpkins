import React from 'react';
import Feed from './feed.jsx';
import styles from '../../styles/landing.css';


const Landing = (props) => {
  return (
    <div className={styles.app}>

      <div className={styles.main_form}>
        <div className={styles.form_title}>
          <h1>Welcome to Tweetrics!</h1>
        </div>
        <form>
          <h3>Enter a username</h3>
          <input id="inputUsername" type="text" name="username"></input>
          <button id="submitButton" type="submit" onClick={props.handleClick}>SUBMIT</button>
        </form>
      </div>

      <Feed feed={props.feed}/>

    </div>
  );
};

export default Landing;
