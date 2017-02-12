import "./Review.css"
import React, { Component } from "react"
import Button from "../Button/Button"

class Review extends Component {
  render() {
    return (
      <div className="Review screen">
        <div className="main">
          <div className="PreviousWord">Game<br/>Over</div>
          <Button className="PlayAgain Button" onClick={ this.props.startGame.bind(this) }>
            Play again
          </Button>
        </div>
      </div>
    )
  }
}

export default Review
