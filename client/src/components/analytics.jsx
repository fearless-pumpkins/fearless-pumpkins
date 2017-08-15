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
    var chart = new CanvasJS.Chart(styles.chartContainer, {
      height: 600,
      width: 600,
  		title:{
  			text: "Rep/Dem Influence"
  		},
  		data: [
  		{
  			// Change type to "doughnut", "line", "splineArea", etc.
  			type: "doughnut",
  			dataPoints: [
  				{ label: "Democratic",  y: this.state.data.infographicState.dem.percent  },
  				{ label: "Republican", y: this.state.data.infographicState.rep.percent  }
  			]
  		}
  		]
  	});

    chart.render();
  }

  render() {
    return (
      <div className={styles.main_card}>

        <div className={styles.profile_card}>

          <div className={styles.profile_image}>
            <img src='/static/resources/default_profile_image.png' />
          </div>

          <div className={styles.profile_info}>
            <p>{this.state.data.name}</p>
            <p>{this.state.data.description}</p>
            <p>{this.state.data.location}</p>
          </div>

        </div>

        <div className={styles.analytics_card}>

          <div id={styles.chartContainer} ></div>
          <p>infographicState other details</p>
        </div>

      </div>
    )
  }

};

export default Analytics;

// 0
// :
// "__v"
// 1
// :
// "screen_name"
// 2
// :
// "name"
// 3
// :
// "location"
// 4
// :
// "description"
// 5
// :
// "imageUrl"
// 6
// :
// "friends"
// 7
// :
// "words"
// 8
// :
// "infographicState"
// 9
// :
// "_id"
