import "./current-score.css"
import React, { Component } from "react"

class CurrentScore extends Component {
  constructor(props) {
    super(props)
    this.state = this._initialState()
  }

  _initialState() {
    // CurrentScore relies on UIScore to transition between score values.
    return {
      UIScore: 0
    }
  }


  render() {
    return (
      <div className="CurrentScore">
        {this.state.UIScore}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    this._countUp(nextProps.score)
  }

  componentWillUnmount() {
    clearTimeout(this.counterTimer)
  }

  _countUp(score) {
    clearTimeout(this.counterTimer)

    if(score > this.state.UIScore) {

      this.setState({
        UIScore: this.state.UIScore + 1
      })

      this.counterTimer = setTimeout(
        this._countUp.bind(this, score),
        75 // TODO: variable increment speed?
      )
    }
  }

  _getTransitionScore() {
    if(this.props.score > this.state.UIScore) {
      this.setState({ UIScore: this.props.score })
    }
  }
}

export default CurrentScore
