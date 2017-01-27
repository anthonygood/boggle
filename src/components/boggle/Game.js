import React, { Component } from "react"
import CurrentScore from "../boggle/CurrentScore"
import CurrentWord from "../boggle/CurrentWord"
import BoggleGrid from "../boggle/BoggleGrid"


// Top-level component for during gameplay
class Game extends Component {
  render() {
    return (
      <div className="Game">
        <CurrentScore score={ this.props.score } />
        <CurrentWord
          pathForMouse={ this.props.pathForMouse }
          pathsForKeyboard={ this.props.pathsForKeyboard }
          lastSubmittedWord={ this.props.lastSubmittedWord } />
        <BoggleGrid { ...this.props } />
      </div>
    );
  }

  componentWillMount() {
    document.addEventListener("mousedown", this._onMouseDown.bind(this))
    document.addEventListener("mouseup",   this._onMouseUp.bind(this))
    document.addEventListener("keydown",   this._onKeyDown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup")
    document.removeEventListener("mousedown")
    document.removeEventListener("keydown")
  }

  _onMouseDown() {
    // Prevent mouse selection if current keyboard paths are present
    if(!this.props.pathsForKeyboard.length) {
      this.props.actions.startSelectingLetters()
    }
  }

  _onMouseUp() {
    this.props.actions.submitWord()
  }

  _onKeyDown(event) {
    this.props.actions.keyPress(event.key)
  }
}

export default Game