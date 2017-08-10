import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
    this.url = 'http://localhost:3000';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    var postObject = {
      screenName: $('#inputUsername')[0].value
    }

    $.ajax({
      type: 'POST',
      url: this.url + '/name',
      data: JSON.stringify(postObject),
      contentType: 'application/json',
      success: (data) => {
        console.log('POST request: success');
        console.log(data);
      },
      error: (err) => {
        console.log('POST request: error', err);
      }
    })
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="app">
        <h1>Welcome to Tweetrics!</h1>
        <div className="mainForm">
          <form>
            <h3>Enter a username</h3>
            <input id="inputUsername" type="text" name="username"></input>
            <button type="submit" onClick={this.handleClick}>SUBMIT</button>
          </form>
        </div>
        <div>

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
