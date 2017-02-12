import "./Splash.css"
import React, { Component } from "react"
import Button from "../Button/Button"

class Splash extends Component {
  constructor(props) {
    super(props)

    this.state = { playClicked: false }
  }

  render() {
    return(
      <div className="Splash screen">
        <div className="main">
          <div className={this._className()}>Boogle</div>
          <Button onClick={this._onButtonClick.bind(this)}>
            Play
          </Button>
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    clearTimeout(this.launchTimeout)
  }

  _className() {
    let className = ["PreviousWord"]
    if(this.state.playClicked) { className.push("correct") }
    return className.join(" ")
  }

  _onButtonClick() {
    this.setState({ playClicked: !this.state.playClicked })
    this.launchTimeout = setTimeout(
      this.props.startGame,
      300
    )
  }
}

export default Splash
