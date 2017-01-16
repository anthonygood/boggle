import * as TYPES from '../actions/action-types'
import makeGrid from "../lib/makeGrid"
import Checker from "../lib/Checker"

const DEFAULT_GRID_SIZE = 4

const DEFAULT_STATE = {
  gamePhase: "notStarted",
  currentWord: [],
  foundWords: [],
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

    case TYPES.SUBMIT_CORRECT_WORD:
      // word == [{letter},{letter}]
      const word  = state.currentWord
      const score = state.score + word.reduce((a,b) => { return a + b.value }, 0)
      const foundWords = [ ...state.foundWords, word ]
      return Object.assign({}, state, { foundWords, score, currentWord: [], selecting: false })

    case TYPES.SUBMIT_INCORRECT_WORD:
      // TODO:
      // Keep a count of all words submitted?
      return Object.assign({}, state, { currentWord: [], selecting: false })

    case TYPES.ADD_LETTER:
      const newWord = [ ...state.currentWord, Object.assign({}, action.letter) ]
      return Object.assign({}, state, {currentWord: newWord})

    default:
      return state
  }
}
