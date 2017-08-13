import React from 'react';
import Feed from './feed.jsx';


const Landing = (props) => {
  return (
    <div className="app">

      <div className="mainForm">
      <h1>Welcome to Tweetrics!</h1>
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
