import React from 'react';
import Feed from './feed.jsx';
import styles from '../../styles/landing.css';


const Landing = (props) => {
  return (
    <div className={styles.app}>

      <div className={styles.main_form}>
        <div className={styles.form_title}>
          Welcome to Tweetrics
        </div>
        <form>
          <p>ENTER A USERNAME</p>
          <input className={styles.input_username} type="text" name="username" onChange={props.onInputChange} placeholder="e.g. realDonaldTrump"></input><br />
          <button className={styles.input_button} type="submit" onClick={props.handleClick}>SUBMIT</button>
        </form>
      </div>

      <Feed feed={props.feed} topTen={props.topTen} handleFeedAboutClick={props.handleFeedAboutClick}/>

    </div>
  );
};

export default Landing;
