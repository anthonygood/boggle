import "./Button.css"
import React, { Component } from "react"

class Button extends Component {
  constructor(props) {
    super(props)

    this.state = { active: false }
  }

  render() {
    return (
      <div className={this._className()} onClick={this._handleClick.bind(this)}>
        {this.props.children}
      </div>
    )
  }

  // Add `active` class if necessary, as well as any className property.
  _className() {
    let className = ["Button", this.props.className]
    if(this.state.active) { className.push("active") }
    return className.join(" ")
  }

  _handleClick() {
    this.setState({ active: !this.state.active })
    this.props.onClick()
  }
}

Button.propTypes = {
  onClick: React.PropTypes.func
}

Button.defaultProps = {
  className: ""
}

export default Button
