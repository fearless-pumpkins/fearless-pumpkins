import React from 'react';
import * as d3 from 'd3';
import styles from '../../../styles/BubbleApp.css';
import BubbleChart from './BubbleChart.jsx';
import Bubbles from './Bubbles.jsx';
import Titles from './Titles.jsx';
import GroupingPicker from './GroupingPicker.jsx';
import { createNodes } from './utils';
import { width, height, center, partyCenters, partyTitles } from './constants';

export default class BubbleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      grouping: 'all',
      width: 100,
      height: 100
    };
    this.onGroupingChanged = this.onGroupingChanged.bind(this);
  }

  componentDidMount() {
    var filteredTweets = this.props.usertweets.filter((tweet)=>{
      if (tweet.party !== 'neutral') {
        return tweet;
      }
    });
    this.setState({
      data: createNodes(filteredTweets),
    });
  }

  onGroupingChanged(newGrouping) {
    this.setState({
      grouping: newGrouping,
    });
  }

  render() {
    const { data, grouping } = this.state;
    return (
      <div className={`${styles.chart} App`}  >
        <h1 className={styles.text} >Word Bubble</h1>
        <BubbleChart width={width} height={height} >
          <Bubbles data={data} forceStrength={0.03} center={center} partyCenters={partyCenters} groupByParty={grouping === 'party'} />
          {
            grouping === 'party' &&
            <Titles width={width} partyTitles={partyTitles} />
          }
        </BubbleChart>
        <GroupingPicker className={styles.partyButton} onChanged={this.onGroupingChanged} active={grouping} />
      </div>
    );
  }

}
