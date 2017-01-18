import "./current-word.css"
import React from "react"

const _className = (props) => {
  // Return different class name according to whether we're showing
  // current or previous word.
  if(props.letters.length || !props.lastSubmittedWord) {
    return "CurrentWord"
  } else {
    return "PreviousWord " + props.lastSubmittedWord.status
  }
}

const _iteratee = (props) => {
  // If there are letters in the current word,
  // or this is the first word, iterate over current word.
  if(props.letters.length || !props.lastSubmittedWord) {
    return props.letters
  } else {
    return props.lastSubmittedWord.letters
  }
}

export default (props) => {
  return(
    <div className={ _className(props) }>
      { _iteratee(props).map((letter) => {
        return <span key={letter._id}>{letter.letter}</span>
      })}
    </div>
  )
}