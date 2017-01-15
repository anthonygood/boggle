import React, { Component } from "react"
import "./App.css"
import BoggleGrid from "../boggle/BoggleGrid"
import Checker from "../../lib/Checker"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicking: false
    }
  }
  render() {
    return (
      <div className="App">
        <BoggleGrid size={4} />
      </div>
    );
  }

  componentWillMount() {
    document.addEventListener("mousedown", this._onMouseDown)
    document.addEventListener("mouseup", this._onMouseUp)
  }

  componentWillUnmout() {
    document.removeEventListener("mousedown")
    document.removeEventListener("mouseup")
  }

  _onMouseDown() {
    // MOUSEDOWN
  }

  _onMouseUp() {
    // If there are letters in store
    // Submit word
  }
}

export default App;
