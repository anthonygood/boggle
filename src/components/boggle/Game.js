import React, { Component } from "react"
import CurrentScore from "../boggle/CurrentScore"
import CurrentWord from "../boggle/CurrentWord"
import BoggleGrid from "../boggle/BoggleGrid"
import Timer from "../boggle/Timer"

const DURATION_SECONDS = 5

// Top-level component for during gameplay
class Game extends Component {

  render() {
    return (
      <div className="Game">
        <Timer countdownFrom={ DURATION_SECONDS } onTimeout={ this._gameOver.bind(this) } />
        <CurrentScore score={ this.props.score } />
        <CurrentWord
          pathForMouse={ this.props.pathForMouse }
          pathsForKeyboard={ this.props.pathsForKeyboard }
          lastSubmittedWord={ this.props.lastSubmittedWord } />
        <BoggleGrid { ...this.props } />
      </div>
    );
  }

  _gameOver() {
    this.props.actions.endGame()
  }
}

export default Game