import areAdjacent from "../lib/areAdjacent"
import eachGridInstance from "../lib/eachGridInstance"
import onSubmitWord from "./onSubmitWord"

// Pass it any value of KeyboardEvent.key (including 'Control', '§', etc.)
const _isALetter = (character) => {
  return ( character.length === 1 ) &&
         ( !!character.toUpperCase().match(/[A-Z]/) )
}

const _alreadyPresent = (letter, path) => {
  return path.findIndex((pathLetter) => {
    return pathLetter._id === letter._id
  }) > -1
}

const onKeyboardAddLetter = (state, letter) => {
  // Disable keyboard input if selecting with mouse
  if(state.selecting) { return state }

  // Ignore non-letters
  if(!_isALetter(letter)) { return state }

  const paths = state.pathsForKeyboard
  let newPaths = []

  // For each {instance} of the letter on the grid -
  eachGridInstance(state.grid, letter, (gridLetter) => {
    // If no path exists, create a new path with the {instance} as the root.
    if(!paths.length) {
      newPaths.push([gridLetter])
    } else {
      // For each {path}: -
      paths.forEach((path, i) => {

        // Ignore if this letter is already in the path (no duplicates allowed)
        if(_alreadyPresent(gridLetter, path)) { return }

        // Is this {instance} adjacent to the last letter of the {path}?
        const lastPathLetter = path[path.length-1]
        if(areAdjacent(lastPathLetter, gridLetter)) {
          // If so, add the letter to the current {path}.
          // const newPath = [...path, gridLetter]
          newPaths.push([...path, gridLetter])
        }
      })
    }
  })

  // If no valid paths, submit the old paths and start again
  if(paths.length && !newPaths.length) {
    // state, currentWordAsString, bestPath
    const currentWordAsString = paths[0].reduce((word, letter) => { return word + letter.letter }, "")
    return onSubmitWord(state, currentWordAsString, paths[0])
  }
  return Object.assign({}, state, { pathsForKeyboard: newPaths })
}

export default onKeyboardAddLetter