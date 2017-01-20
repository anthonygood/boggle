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
    className += this.props.isLastSelected ? " lastSelected" : ""
    return className
  }

  _select() {
    if(!this.props.isSelected) { this.props.actions.addLetter(this.props) }
  }

  _onMouseOver() {
    // If the user is clicking (button is clicked)
    // Add the letter to the word
    if(this.props.selecting) {
      this._select()
    }
  }
}

export default BoggleTile
