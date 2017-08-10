import React from 'react';

const Landing = (props) => {
  return (
    <div className="app">
      <h1>Welcome to Tweetrics!</h1>
      <div className="mainForm">
        <form>
          <h3>Enter a username</h3>
          <input id="inputUsername" type="text" name="username"></input>
          <button type="submit" onClick={props.handleClick}>SUBMIT</button>
        </form>
      </div>
      <div>

      </div>
    </div>

  );
};

export default Landing;
