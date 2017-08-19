import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import { fillColor } from './utils';
import tooltip from './Tooltip.jsx';

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    const { forceStrength, center } = props;
    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .on('tick', this.ticked.bind(this))
      .stop();
    this.onRef = this.onRef.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
    this.regroupBubbles = this.regroupBubbles.bind(this);
    var state = {
      g: null,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.groupByParty) {
      this.regroupBubbles(nextProps.data);
    } else if (this.props.groupByParty && !nextProps.groupByParty) {
      this.renderBubbles();
    }
  }

  shouldComponentUpdate() {
    // we will handle moving the nodes on our own with d3.js
    // make React ignore this component
    return false;
  }

  onRef(ref) {
    this.setState({ g: d3.select(ref) }, () => {
      console.log(this.state);
      this.renderBubbles(this.props.data);
    });

  }

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius * 20);
  }

  regroupBubbles(groupByParty) {
    const { forceStrength, partyCenters, center } = this.props;
    if (groupByParty) {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => partyCenters[d.party].x))
        .force('y', d3.forceY().strength(forceStrength).y(d => partyCenters[d.party].y));
    } else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y));
    }
    this.simulation.alpha(1).restart();
  }

  renderBubbles(data) {
    //Bind data
    const bubbles = this.state.g.selectAll('.bubble').data(data);

    // Enter
    const bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => fillColor(d.party))
      .attr('stroke', d => d3.rgb(fillColor(d.party)).darker())
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)  // eslint-disable-line
      .on('mouseout', hideDetail) // eslint-disable-line

    bubblesE.transition().duration(2000).attr('r', d => d.radius).on('end', () => {
      this.simulation.nodes(data)
        .alpha(1)
        .restart();
    });

    // Exit
    bubbles.exit().remove();
  }

  render() {
    return (
      <g ref={this.onRef} className="bubbles" />
    );
  }
}

Bubbles.propTypes = {
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  forceStrength: PropTypes.number.isRequired,
  groupByParty: PropTypes.bool.isRequired,
  partyCenters: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

/*
* Function called on mouseover to display the
* details of a bubble in the tooltip.
*/
export let showDetail = (d) => {
  // change outline to indicate hover state.
  d3.select(this).attr('stroke', 'black');

  const content = `
    <span class="name">
      Word:
    </span>
    <span class="value">
      ${d.name}
    </span>
    <br/>` + `
    <span class="name">
      Salience:
    </span>
    <span class="value">
      ${d.value}
    </span>
    <br/>` + `
    <span class="name">
      Party Affiliation:
    </span>
    <span class="value">
      ${d.party}
    </span>
    <br/>` + `
    <span class="name">
      impact:
    </span>
    <span class="value">
      ${d.impact}
    </span>`;

  tooltip.showTooltip(content, d3.event);
};

/*
* Hides tooltip
*/
export let hideDetail = (d) => {
  // reset outline
  d3.select(this)
    .attr('stroke', d3.rgb(fillColor(d.group)).darker());

  tooltip.hideTooltip();
};
