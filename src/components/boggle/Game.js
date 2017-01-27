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
}

export default Game