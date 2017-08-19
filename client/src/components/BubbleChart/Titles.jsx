import React, { PropTypes } from 'react'

export default function Titles({ partyTitles }) {
  return (
    <g className="partyTitles">
      {
        Object.keys(partyTitles).map(party =>
          <text
            key={party}
            x={partyTitles[party].x}
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
  partyTitles: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
