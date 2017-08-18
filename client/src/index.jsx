import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Landing from './components/landing.jsx';
import Loading from './components/loading.jsx';
import Analytics from './components/analytics.jsx';
import AboutInfo from './components/aboutInfo.jsx';
import FeedInfo from './components/feedInfo.jsx';

import styles from '../styles/landing.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      stage: 'landing',
      analytics: {},
      feed: 'about',
      topSearchedUsers: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.backToLanding = this.backToLanding.bind(this);
    this.handleFeedAboutClick = this.handleFeedAboutClick.bind(this);
  }

  handleFeedAboutClick(feedState) {
    this.setState ({
      feed: feedState
    });
  }

  // Brings the all of the app's states back to default values
  backToLanding() {
    this.setState({
      username: '',
      stage: 'landing',
      analytics: {},
      feed: 'about'
    });
  }

  onInputChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  // Handles the click event on the submit button
  // When invoked, changes stage to loading until ajax request is successfully
  // returned
  handleClick(event) {
    // To prevent default auto refresh of the page
    event.preventDefault();

    if (this.state.username === '' ||
    this.state.username === undefined ||
    this.state.username === null || typeof
    this.state.username !== 'string' ||
    this.state.username.includes('<')) {
      alert('Your input is invalid');
    } else {
      // Set stage to loading once button is clicked
      this.setState({
        stage: 'loading'
      });

      // Get value from input field and store it in the passable object
      var postObject = {
        screenName: this.state.username
      };

      $.ajax({
        type: 'POST',
        url: '/name',
        data: JSON.stringify(postObject),
        contentType: 'application/json',
        success: (data) => {
          console.log('POST request: success');
          // Changes stage to analytics
          // and sets received information to app state
          this.setState({
            analytics: data,
            stage: 'analytics'
          });
        },
        error: (err) => {
          if (err.status >= 400) {
            alert('Oops! Something went wrong...');
          } else {
            alert('Your input might be invalid');
          }
          this.backToLanding();
          console.log('POST request: error', err);
        }
      });
    }
  }

  componentWillMount () {
    // update feed
    var topSearches = [];
    // Ajax request to retrieve list of all searched users
    $.ajax({
      type: 'GET',
      url: '/usersList',
      success: (data) => {
        console.log('GET request: success');

        // Find top 10 most popular searches (based on 'count' property)
        data.forEach(user => {
          if (topSearches.length < 10) {
              topSearches.push(user);
          } else {
            if (user.count !== 0) {
              for (var i = 0; i < topSearches.length; i++) {
                if (user.count > topSearches[i].count) {
                  topSearches[i] = user;
                  break;
                }
              }
            }
          }
        });

        this.setState({
          topSearchedUsers: topSearches
        });
      },
      error: (err) => {
        console.log('POST request: error', err);
      }
    });
  }

  render() {

    // Conditional rendering based on stage of the app
    let element = '';
    let homeButton = '';
    if (this.state.stage === 'landing') {
      element = <Landing handleClick={this.handleClick} onInputChange={this.onInputChange} handleFeedAboutClick={this.handleFeedAboutClick} feed={this.state.feed} topTen={this.state.topSearchedUsers}/>;
    }

    if (this.state.stage === 'loading') {
      element = <Loading stage={this.state.stage}/>;
    }

    if (this.state.stage === 'analytics') {
      homeButton = <button id={styles.homeButton} onClick={this.backToLanding}>HOME</button>;
      element = <Analytics analytics={this.state.analytics}/>;
    }

    return (
      <div className={styles.render_element}>
        {homeButton}
        {element}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
