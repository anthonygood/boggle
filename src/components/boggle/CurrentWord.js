import "./current-word.css"
import React from "react"

export default (props) => {
  return (
    <div className="CurrentWord">
      {props.letters.map((letter) => {
        return <span key={letter._id}>{letter.letter}</span>
      })}
    </div>
  )
}