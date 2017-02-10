import "./App.css"
import React, { Component } from "react"
import Splash from "../splash/Splash"
import Game from "../boggle/connected-game"
import GameError from "../boggle/GameError"
import Review from "../review/Review"

class App extends Component {

  render() {
    return (
      <div className="App">
        { this._innerContent(this.props.boggle.gamePhase) }
      </div>
    )
  }

  start() {
    this.props.actions.startGame()
  }

  _innerContent(gamePhase) {
    switch(gamePhase) {
      case "started":
        return this._game()
      case "finished":
        return this._review()
      case "error":
        return this._gameError()
      default:
        return this._splash()
    }
  }

  _splash() {
    return <Splash startGame={ this.start.bind(this) } { ...this.props.boggle } />
  }

  _game() {
    return <Game { ...this.props.boggle } />
  }

  _review() {
    return <Review startGame={ this.start.bind(this) } { ...this.props.boggle } />
  }

  _gameError() {
    return <GameError />
  }
}

export default App
