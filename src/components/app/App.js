import "./App.css"
import React, { Component } from "react"
import Splash from "../splash/Splash"
import Game from "../boggle/connected-game"

class App extends Component {
  constructor(props) {
    super(props)
    this.props.actions.startGame()
  }

  render() {
    return (
      <div className="App">
        { this._innerContent(this.props.boggle.gamePhase) }
      </div>
    )
  }

  start() {
    console.log("start!")
    this.props.actions.startGame()
  }

  _innerContent(gamePhase) {
    switch(gamePhase) {
      case "started":
        return this._game()
      case "finished":
        return this._review()
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
    return (
      <div className="Review">Over</div>
    )
  }
}

export default App
