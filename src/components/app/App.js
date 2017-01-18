import "./App.css"
import React, { Component } from "react"
import CurrentScore from "../boggle/CurrentScore"
import CurrentWord from "../boggle/CurrentWord"
import BoggleGrid from "../boggle/BoggleGrid"

class App extends Component {
  constructor(props) {
    super(props)
    window.app = this
    this.props.actions.startGame()
  }

  render() {
    return (
      <div className="App">
        <CurrentScore score={ this.props.score } />
        <CurrentWord letters={ this.props.currentWord } />
        <BoggleGrid { ...this.props } />
      </div>
    );
  }

  componentWillMount() {
    document.addEventListener("mousedown", this._onMouseDown.bind(this))
    document.addEventListener("mouseup",   this._onMouseUp.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown")
    document.removeEventListener("mouseup")
  }

  _onMouseDown() {
    this.props.actions.startSelectingLetters()
  }

  _onMouseUp() {
    this.props.actions.submitWord()
  }
}

export default App;
