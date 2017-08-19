import React, { PropTypes } from 'react'

export default function Titles({ partyCenters }) {
  return (
    <g className="partyTitles">
      {
        Object.keys(partyCenters).map(party =>
          <text
            key={party}
            x={partyCenters[party].x}
            y={50}
            fontSize="35"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {
              party
            }
          </text>)
      }
    </g>
  )
}

Titles.propTypes = {
  partyCenters: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
