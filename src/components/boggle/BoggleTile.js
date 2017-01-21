import React, { Component } from "react"
import "./Boggle.css"
import "./Line.css"

class BoggleLine extends Component {
  render() {
    const index = this._indexInCurrentWord()
    if(index < 1) { return null }

    const prevLetter = this._previousLetter(index)
    const className = this._className(prevLetter)

    return (
      <div className={className}></div>
    )
  }

  _className(prevLetter) {
    return "Line " + this._compassPoint(prevLetter)
  }

  // Returns CSS class (n, s, e, w, se, etc.)
  // according to the direction of the previous letter.
  _compassPoint(prevLetter) {
    const thisX = this.props.x,
          thisY = this.props.y,
          prevX = prevLetter.x,
          prevY = prevLetter.y

    const x = prevX - thisX,
          y = prevY - thisY

    const key = "" + x + ":" + y, // eg. "0:-1", "-1:1"
          points = {
      "0:-1": "n",
      "-1:-1": "nw",
      "1:-1": "ne",
      "1:0":"e",
      "0:1": "s",
      "1:1": "se",
      "-1:1": "sw",
      "-1:0": "w"
    }

    return points[key]
  }

  _indexInCurrentWord() {
    return this.props.currentWord.findIndex(
      (letter) => { return letter._id === this.props._id }
    )
  }
  _previousLetter(index) {
    return this.props.currentWord[index - 1]
  }
}

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
