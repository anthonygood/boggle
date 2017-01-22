import "./current-word.css"
import React from "react"

// The CurrentWord component displays the current word the user is building.
// If there is no currently active word path, it will display the last submitted word.

// Function to get the first active path, either from mouse or keyboard input.
const _firstActivePath = (props) => {
  if(props.pathForMouse.length) {
    return props.pathForMouse
  } else if(props.pathsForKeyboard.length) {
    return props.pathsForKeyboard[0]
  } else {
    return null
  }
}

// Use a different class name according to whether we're showing
// current or previous word.
const _className = (props) => {
  if(_firstActivePath(props) || !props.lastSubmittedWord) {
    return "CurrentWord"
  } else {
    return "PreviousWord " + props.lastSubmittedWord.status
  }
}

// There are multiple sources for CurrentWord to consider:
// 1. pathForMouse (an array representing a single path)
// 2. pathsForKeyboard (a 2D array representing potentially many paths)
// 3. lastSubmittedWord, in the absence of the previous two
const word = (props) => {
  const activePath = _firstActivePath(props)
  // If there are letters in pathForMouse, iterate over pathsForMouse.
  if(activePath) {
    return activePath

  // If there's a previous word, iterate over that instead.
  } else if(props.lastSubmittedWord) {
    return props.lastSubmittedWord.letters

  // Otherwise an empty array.
  } else {
    return []
  }
}

export default (props) => {
  return(
    <div className={ _className(props) }>
      { word(props).map((letter) => {
        return <span key={letter._id}>{letter.letter}</span>
      })}
    </div>
  )
}
