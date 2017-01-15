import React, { Component } from "react"
import "./boggle.css"

class BoggleTile extends Component {
  render() {
    return (
      <div className={this._className()}>
        {this.props.letter}
        <div className="Value">{this.props.value}</div>
        <div className="Hitbox" onMouseDown={this._select.bind(this)} onMouseOver={this._onMouseOver.bind(this)}></div>
      </div>
    )
  }

  _className() {
    let className = "BoggleTile"
    className += this.props.isSelected ? " selected" : ""
    return className
  }

  _select() {
    window.tile = this
    this.props.actions.addLetter(this.props)
  }

  _onMouseOver() {
    // If the user is clicking (button is clicked)
    // Add the letter to the word
    if(this.props.selecting) {
      this._select()
    }
  }

  // Method to check if the current tile has already been selected for the current word
  _isSelected() {

  }
}

export default BoggleTile
