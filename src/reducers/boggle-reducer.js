import * as TYPES from "../actions/action-types"
import onSubmitWord from "./onSubmitWord"
import areAdjacent from "../lib/areAdjacent"

const DEFAULT_STATE = {
  gamePhase: "notStarted",
  currentWord: [],
  lastSubmittedWord: null,
  foundWords: {},
  grid: [],
  score: 0,
  selecting: false
}

const onSubmitLetter = (state, letter) => {
  const lastLetter = state.currentWord[state.currentWord.length-1]

  if(areAdjacent(letter, lastLetter)) {
    const newWord = [ ...state.currentWord, Object.assign({}, letter) ]
    return Object.assign({}, state, {currentWord: newWord})
  } else {
    return state
  }

}

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case TYPES.START_GAME:
      return Object.assign({}, state, { gamePhase: "started", grid: action.grid })

    case TYPES.END_GAME:
      return Object.assign({}, state, { gamePhase: "finished" })

    case TYPES.START_SELECTING_LETTERS:
      return Object.assign({}, state, { selecting: true })

    case TYPES.SUBMIT_WORD:
      const currentWordAsString = state.currentWord.map((letter) => { return letter.letter }).join("").toLowerCase()
      return onSubmitWord(state, currentWordAsString)

    case TYPES.ADD_LETTER:
      return onSubmitLetter(state, action.letter)

    default:
      return state
  }
}
