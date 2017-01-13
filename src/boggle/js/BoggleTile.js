import React, { Component } from 'react';
import "../css/boggle.css";

class BoggleTile extends Component {
  render() {
    return (
      <div className="BoggleTile">
        {this.props.letter}
      </div>
    );
  }
}

export default BoggleTile
