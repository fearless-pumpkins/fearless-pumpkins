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
      stage: 'loading',
      analytics: {},
      feed: {
        feedOrAbout: 'about',
        information: <AboutInfo />
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.backToLanding = this.backToLanding.bind(this);
    this.handleFeedAboutClick = this.handleFeedAboutClick.bind(this);
  }

  handleFeedAboutClick(feedState) {
    if (feedState === 'feed') {
      this.setState ({
        feed: {
          feedOrAbout: feedState,
          information: <FeedInfo />
        }
      });
    } else {
      this.setState({
        feed: {
          feedOrAbout: feedState,
          information: <AboutInfo />
        }
      });
    }
  }

  backToLanding() {
    this.setState({
      username: '',
      stage: 'landing',
      analytics: {},
      feed: {
        feedOrAbout: 'about',
        information: <AboutInfo />
      }
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
      })
    }
  }

  componentDidMount () {
    // update feed
  }

  render() {

    // Conditional rendering based on stage of the app
    let element = '';
    let homeButton = '';
    if (this.state.stage === 'landing') {
      element = <Landing handleClick={this.handleClick} onInputChange={this.onInputChange} handleFeedAboutClick={this.handleFeedAboutClick} feed={this.state.feed} />;
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
