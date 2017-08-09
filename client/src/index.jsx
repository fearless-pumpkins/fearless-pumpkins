import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <p> Hello world! </p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
