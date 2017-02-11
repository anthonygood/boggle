import "./timer.css"
import React, { Component } from "react"


class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = { secondsRemaining: props.countdownFrom }
  }

  render() {
    return (
      <div className="Timer">
        { this.state.secondsRemaining }
      </div>
    )
  }

  componentWillMount() {
    this._countdown()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  _countdown() {
    this.timer = setTimeout(
      this._decrement.bind(this),
      1000
    )
  }

  _decrement() {
    this.setState({ secondsRemaining: this.state.secondsRemaining - 1 })

    if(this.state.secondsRemaining) {
      this._countdown()
    } else {
      this.props.onTimeout()
    }
  }
}

Timer.propTypes = {
  countdownFrom: React.PropTypes.number.isRequired
}

export default Timer
