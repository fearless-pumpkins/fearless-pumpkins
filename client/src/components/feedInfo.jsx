import React from 'react';
import styles from '../../styles/feedInfo.css';

class FeedInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topTen: props.topTen
    }
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(newProps)) {
      this.setState({
        topTen: newProps.topTen
      });
    }
  }

  render() {
    let heading =  '';
    let body = '';

    if (this.state.topTen.length > 0) {
      heading =
        <div className={styles.topic}>
          <a>Top 10 Most Searched Usernames</a>
        </div>;

      body =
        <div className={styles.description}>
          {this.state.topTen.map((user, id) => (<p key={id}>{user.screen_name}</p>))}
        </div>;
    } else {
      heading =
        <div className={styles.topic}>
          <a>LOADING...</a>
        </div>;
    }

    return (
      <div className={styles.feed_info}>
        {heading}
        {body}
      </div>
    );
  }
};

export default FeedInfo;
