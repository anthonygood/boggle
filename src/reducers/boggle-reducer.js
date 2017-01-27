import * as TYPES from "../actions/action-types"
import onSubmitWord from "./onSubmitWord"
import onKeyboardAddLetter from "./onKeyboardAddLetter"
import areAdjacent from "../lib/areAdjacent"

const DEFAULT_STATE = {
  gamePhase: "notStarted",
  foundWords: {},
  grid: [],
  score: 0,
  selecting: false,
  // Words are built up from paths through the grid,
  // either from mouse or keyboard
  pathForMouse: [],
  pathsForKeyboard: [],
  // The last submitted word is represented as an object:
  // { letter: [{a}{b}], status: 'incorrect', asString: 'ab'}
  lastSubmittedWord: null,
}

const onSubmitLetter = (state, letter) => {
  const lastLetter = state.pathForMouse[state.pathForMouse.length-1]

  if(areAdjacent(letter, lastLetter)) {
    const newWord = [ ...state.pathForMouse, Object.assign({}, letter) ]
    return Object.assign({}, state, { pathForMouse: newWord })
  } else {
    return state
  }
}

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    // TODO:
    // Separate reducer for gamePhase.
    case TYPES.START_GAME:
      return Object.assign({}, state, { gamePhase: "started", grid: action.grid })

    case TYPES.END_GAME:
      return Object.assign({}, state, { gamePhase: "finished" })

    case TYPES.START_SELECTING_LETTERS:
      return Object.assign({}, state, { selecting: true })

    case TYPES.SUBMIT_WORD:
      // TODO:
      // Account for different keyboard paths, with different multipliers.
      const bestPath = state.pathForMouse.length ? state.pathForMouse : state.pathsForKeyboard[0]

      if(!bestPath) { return Object.assign({}, state, { selecting: false }) }

      const currentWordAsString = bestPath.map((letter) => { return letter.letter }).join("").toLowerCase()
      return onSubmitWord(state, currentWordAsString, bestPath)

    case TYPES.ADD_LETTER:
      return onSubmitLetter(state, action.letter)

    case TYPES.ADD_LETTER_KEYBOARD:
      return onKeyboardAddLetter(state, action.letter)

    default:
      return state
  }
}
