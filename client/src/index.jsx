import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['hello']
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <h1>Welcome to Tweetrics!</h1>
        <div>
          <form className='mainForm'>
            <h3>Enter a username</h3>
            <input type="text" name="username"></input>
            <button type="submit" onClick={this.handleClick}>SUBMIT</button>
          </form>
        </div>
        <div>
          <p>{this.state.items}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
