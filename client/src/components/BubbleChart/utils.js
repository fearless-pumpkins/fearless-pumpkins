import * as d3 from 'd3';

/*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
export let createNodes = (rawData) => {
  // Use the max total_amount in the data as the max in the scale's domain
  // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => +d.salience);

  // Sizes bubbles based on area.
  // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
    .exponent(0.5)
    .range([2, 85])
    .domain([0, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
  const myNodes = rawData.map(d => ({
    radius: radiusScale(10 * Math.abs(d.salience * d.sentiment.magnitude * d.sentiment.score)),
    attitude: d.sentiment.score,
    value: +d.salience,
    maxImpact: maxAmount,
    name: d.name,
    party: d.party,
    impact: Math.abs(d.salience * d.sentiment.magnitude * d.sentiment.score),
    x: Math.random() * 900,
    y: Math.random() * 800,
  }));

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value);

  return myNodes;
};

export const fillColor = d3.scaleOrdinal().domain(['democrat', 'both', 'republican']).range(['rgb(135,205,235)', 'rgba(194,163,215,.51)', 'rgba(246,119,119,.62)']);
