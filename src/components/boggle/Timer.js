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
        { this._format() }
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

  _format() {
    let   secs = this.state.secondsRemaining
    const mins = Math.floor( secs / 60 )
          secs -= (mins * 60)
          secs = secs < 10 ? "0" + secs : secs
    return `${mins}:${secs}`
  }
}

Timer.propTypes = {
  countdownFrom: React.PropTypes.number.isRequired
}

export default Timer
