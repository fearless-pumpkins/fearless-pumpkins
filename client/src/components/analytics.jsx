import React from 'react';
import styles from '../../styles/analytics.css';
import BubbleApp from './BubbleChart/BubbleApp.jsx';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.analytics
    }
  }

  componentDidMount() {
    // Creates the doughnut chart using CanvasJS library.
    // Library can be found in client/dist/chart_lib
    var chart = new CanvasJS.Chart(styles.chartContainer, {
      height: 600,
      width: 800,
  		title:{
  			text: `${this.state.data.name}'s Percentage of Influence from Dem/Rep Party`
  		},
  		data: [
  		{
  			// Change type to "doughnut", "line", "splineArea", etc.
  			type: "doughnut",
  			dataPoints: [
  				{ label: "Democrat",  y: parseFloat(this.state.data.infographicState.dem.percent).toFixed(2) },
  				{ label: "Republican", y: parseFloat(this.state.data.infographicState.rep.percent).toFixed(2)  }
  			]
  		}
  		]
  	});

    chart.render();
  }

  render() {

    // Add image to the div inside profile_image div
    // .replace() is needed to get the larger size picture
    var profileImageStyle = {
      backgroundImage: `url(${(this.state.data.imageUrl).replace('_normal', '')})`
    };

    return (
      <div className={styles.main_card}>
        <div className={styles.profile}>

          <div className={styles.profile_card}>
            <div className={styles.profile_image}>
              <div style={profileImageStyle}>
              </div>
            </div>

            <div className={styles.profile_info}>
              REAL NAME:
              <p>{this.state.data.name}</p>
              DESCRIPTION:
              <p>{this.state.data.description}</p>
              LOCATION:
              <p>{this.state.data.location}</p>
            </div>
          </div>

          <div className={styles.analytics_card}>
            <div id={styles.chartContainer} ></div>
            <div className={styles.chart_description}>
              <div className={styles.description_title}>CHART DESCRIPTION</div>
              <p>Based on a <i>lexical analysis of {this.state.data.name}'s tweets</i> and
              an <i>analysis of that Twitter user's friends</i>, it has been determined that
              {this.state.data.name} appears to be <a id={styles.dem_percent}>{parseFloat(this.state.data.infographicState.dem.percent).toFixed(2)}%
              Democrat</a> and <a id={styles.rep_percent}>{parseFloat(this.state.data.infographicState.rep.percent).toFixed(2)}% Republican</a>.</p>
            </div>
            <BubbleApp usertweets={this.state.data.words}/>
            <div className={styles.word_bubble_description}>
              <div className={styles.description_title}>WORD BUBBLE DESCRIPTION</div>
              <p>Each bubble in the chart above represents a word of importance to the twitter user, a word that has
              been used repeatedly or used in a strong contextual sentiment throughout {this.state.data.name}'s tweets.</p>
              <p>The size of the bubble is based on the <i>Impact</i> it has on calculating the influence of a corresponding
              political party on the Twitter user undergoing the analysis.</p>
              <ul>
                <li>Salience - shows importance or centrality of an entity to the entire text that has been analysed.
                It ranges from 0 (less salient) to 1 (very salient).</li>
                <li>Party Affiliation - which political party does the target word most affiliates with.</li>
                <li>Impact - measures the impact the target word has on calculating the influence of a corresponding
                political party on the Twitter user.</li>
              </ul>

            </div>
          </div>

        </div>
      </div>
    )
  }

};

export default Analytics;
