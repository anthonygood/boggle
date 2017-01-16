import "./current-score.css"
import React from "react"

export default (props) => {
  return (
    <div className="CurrentScore">
      {props.score}
    </div>
  )
}
