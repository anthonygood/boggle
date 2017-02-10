import React, { Component } from "react"

class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = this._initialState(props)
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

  _initialState(props) {
    return { secondsRemaining: props.countdownFrom }
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
