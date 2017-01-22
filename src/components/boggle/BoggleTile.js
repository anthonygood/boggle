import "./Boggle.css"
import React, { Component } from "react"
import BoggleLine from "./BoggleLine"

class BoggleTile extends Component {
  render() {
    return (
      <div className="BoggleTileContainer">
        <div className={this._className()}>
          {this.props.letter}
          <div className="Value">{this.props.value}</div>
          <div className="Hitbox" onMouseDown={this._select.bind(this)} onMouseOver={this._onMouseOver.bind(this)}></div>
        </div>
        <BoggleLine {...this.props} />
      </div>
    )
  }

  _className() {
    let className = "BoggleTile"
    className += this.props.isSelected ? " selected" : ""
    className += this.props.isLastSelected || this.props.isLastSelectedKeyboard ? " lastSelected" : ""
    className += this.props.isSelectedKeyboard ? " selected-keyboard" : ""
    return className
  }

  _select() {
    // Don't select if already selected, or if selecting with keyboard
    if(!this.props.isSelected && !this.props.pathsForKeyboard.length) {
      this.props.actions.addLetter(this.props)
    }
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
