import React, { Component } from "react"
import "./boggle.css"

class BoggleTile extends Component {
  render() {
    return (
      <div className="BoggleTile">
        {this.props.letter}
        <div className="Value">{this.props.value}</div>
        <div className="Hitbox" onMouseOver={this._onMouseOver.bind(this)}></div>
      </div>
    );
  }

  _onMouseOver() {
    // If the user is clicking (button is clicked)
    // Add the letter to the word
  }
}

export default BoggleTile
