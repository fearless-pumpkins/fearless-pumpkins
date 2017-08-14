import React from 'react';
import styles from '../../styles/analytics.css';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.analytics
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.main_card}>
        <div className={styles.profile_card}>
          <div id={styles.profile_image}>
          </div>
          <h3>{this.state.data.name}</h3>
        </div>
        <div className={styles.analytics_card}>
        </div>
      </div>
    )
  }

};

export default Analytics;
