import "./Splash.css"
import React, { Component } from "react"
import Button from "./Button"

class Splash extends Component {
  render() {
    window.splash = this
    return(
      <div className="Splash">
        <Button onClick={ this.props.startGame }>
          Hello
        </Button>
      </div>
    )
  }
}

export default Splash
