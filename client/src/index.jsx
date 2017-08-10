import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Landing from './components/landing.jsx';
import Loading from './components/loading.jsx';
import Analytics from './components/analytics.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'landing',
      analytics: {},
      friends: []
    };
    this.url = 'http://localhost:3000';
    this.handleClick = this.handleClick.bind(this);
  }

  // Handles the click event on the submit button
  // When invoked, changes stage to loading until ajax request is successfully
  // returned
  handleClick(event) {
    // To prevent default auto refresh of the page
    event.preventDefault();

    // Set stage to loading once button is clicked
    this.setState({
      stage: 'loading'
    });

    // Get value from input field and store it in the passable object
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

        // Changes state to analytics
        // and sets received information to app state
        this.setState({
          analytics: data,
          stage: 'analytics'
        });
      },
      error: (err) => {
        console.log('POST request: error', err);
      }
    })
  }

  componentDidMount() {

  }

  render() {

    // Conditional rendering based on stage of the app
    let element = '';
    if (this.state.stage === 'landing') {
      element = <Landing handleClick={this.handleClick}/>;
    }

    if (this.state.stage === 'loading') {
      element = <Loading />;
    }

    if (this.state.stage === 'analytics') {
      element = <Analytics />;
    }

    return (
      <div>
      {element}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
