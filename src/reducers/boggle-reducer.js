import * as TYPES from "../actions/action-types"
import onSubmitWord from "./onSubmitWord"

const DEFAULT_GRID_SIZE = 4

const DEFAULT_STATE = {
  gamePhase: "notStarted",
  currentWord: [],
  foundWords: {},
  grid: [],
  score: 0,
  selecting: false
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
      const newWord = [ ...state.currentWord, Object.assign({}, action.letter) ]
      return Object.assign({}, state, {currentWord: newWord})

    default:
      return state
  }
}
