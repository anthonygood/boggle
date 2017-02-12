import "./App.css"
import "../Button/Button.css"
import React, { Component } from "react"
import Splash from "../splash/Splash"
import Game from "../boggle/connected-game"
import GameError from "../boggle/GameError"
import Review from "../review/Review"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"

class App extends Component {

  render() {
    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="main"
          transitionAppear={false}
          transitionAppearTimeout={1000}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000} >
          { this._innerContent(this.props.boggle.gamePhase) }
        </ReactCSSTransitionGroup>
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
    return <Splash key="splash" startGame={ this.start.bind(this) } { ...this.props.boggle } />
  }

  _game() {
    return <Game key="game" { ...this.props.boggle } />
  }

  _review() {
    return <Review key="review" startGame={ this.start.bind(this) } { ...this.props.boggle } />
  }

  _gameError() {
    return <GameError key="error" />
  }
}

export default App
