import React, { Component } from "react"
import "./Line.css"

class BoggleLine extends Component {
  render() {
    // In the case of keyboard input, there may be multiple paths/previous letters
    const prevLetters = this._previousLetters()

    return (
      <div className="LineContainer">
        { prevLetters.map((letter, i) =>
          <div key={i} className={this._className(letter)}></div>
        )}
      </div>
    )
  }

  _className(prevLetter) {
    let className = "Line " + this._compassPoint(prevLetter)
    className += this.props.pathsForKeyboard.length ? " keyboard" : ""
    return className
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
      "0:-1":  "n",
      "-1:-1": "nw",
      "1:-1":  "ne",
      "1:0":   "e",
      "0:1":   "s",
      "1:1":   "se",
      "-1:1":  "sw",
      "-1:0":  "w"
    }

    return points[key]
  }

  _activePaths() {
    if(this.props.pathForMouse.length) {
      return [this.props.pathForMouse]
    } else {
      return this.props.pathsForKeyboard
    }
  }

  // Letter won't necessarily have the same index in all paths,
  // especially where the same letter occurs twice in a word.
  // eg. "HO[O]P" versus "H[O]OP"
  _previousLetters() {
    return this._activePaths().map((path) => {

      // Find this letter's index in path.
      const index = path.findIndex((letter) => { return letter._id === this.props._id })

      // May return undefined!
      return path[index-1]
    }).filter((letter) => { return typeof letter !== "undefined" })
  }
}

export default BoggleLine
