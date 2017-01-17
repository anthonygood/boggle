import * as TYPES from '../actions/action-types'
import makeGrid from "../lib/makeGrid"
import Checker from "../lib/Checker"

const DEFAULT_GRID_SIZE = 4

const DEFAULT_STATE = {
  gamePhase: "notStarted",
  currentWord: [],
  foundWords: {},
  grid: [],
  score: 0,
  selecting: false
}

const onSubmitWord = (state, currentWordAsString) => {
  // TODO:
  // Specific UI response for submitting previously found word
  if(Checker.check(currentWordAsString) && _wordNotYetFound(state, currentWordAsString)) {
    return _handleCorrectWord(state, currentWordAsString)
  } else {
    return _handleIncorrectWord(state, currentWordAsString)
  }
}

const _wordNotYetFound = (state, currentWordAsString) => {
  return !state.foundWords.hasOwnProperty(currentWordAsString)
}

const _handleCorrectWord = (state, currentWordAsString) => {
  // currentWordAsString == "cat"
  //   state.currentWord == [{c}{a}{t}]
  const word  = state.currentWord
  const score = state.score + word.reduce((a,b) => { return a + b.value }, 0)

  let wordObj = {}
  wordObj[currentWordAsString] = word

  const foundWords = Object.assign({}, state.foundWords, wordObj)
  return Object.assign({}, state, { foundWords, score, currentWord: [], selecting: false })
}

const _handleIncorrectWord = (state) => {
  // TODO:
  // Keep a count of all words submitted?
  return Object.assign({}, state, { currentWord: [], selecting: false })
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
