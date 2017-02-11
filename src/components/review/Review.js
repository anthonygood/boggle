import React, { Component } from "react"

class Review extends Component {
  render() {
    return (
      <div className="Review">
        <div className="PreviousWord">Game<br/>Over</div>
        <div className="PlayAgain btn" onClick={ this.props.startGame.bind(this) }>Play again</div>
      </div>
    )
  }
}

export default Review
