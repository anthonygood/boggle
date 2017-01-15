import React, { Component } from "react"
import "./App.css"
import CurrentWord from "../boggle/CurrentWord"
import BoggleGrid from "../boggle/BoggleGrid"

class App extends Component {
  render() {
    console.log("render!")
    window.app = this
    return (
      <div className="App">
        <CurrentWord letters={ this.props.boggle.currentWord } />
        <BoggleGrid { ...this.props.boggle } />
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
    this.props.actions.endSelectingLetters()
  }
}

export default App;
