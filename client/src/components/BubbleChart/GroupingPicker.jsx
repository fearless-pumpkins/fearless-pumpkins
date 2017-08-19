import React, { PropTypes } from 'react'
import '../../../styles/GroupingPicker.css'

export default class GroupingPicker extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }
  onBtnClick(event) {
    this.props.onChanged(event.target.name);
  }
  render() {
    const { active } = this.props;
    return (
      <div className="GroupingPicker">
        <button className={`button ${active === 'party' && 'active'}`} name="party" onClick={this.onBtnClick}>Words By Party</button>
      </div>
    );
  }
}

GroupingPicker.propTypes = {
  onChanged: PropTypes.func.isRequired,
  active: PropTypes.oneOf(['all', 'party']).isRequired,
};
