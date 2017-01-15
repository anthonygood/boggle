import * as TYPES from '../actions/action-types'
import makeGrid from "../lib/makeGrid"
import Checker from "../lib/Checker"

const DEFAULT_GRID_SIZE = 4

const DEFAULT_STATE = {
  currentWord: [],
  foundWords: [],
  grid: makeGrid(DEFAULT_GRID_SIZE),
  score: 0,
  selecting: false
}

const submitWord = (state, word) => {
  // Check that word is correct
  const currentWord = state.currentWord.map(
    (letter) => { return letter.letter }
  ).join("").toLowerCase()

  console.log(currentWord)

  const isCorrect = Checker.check(currentWord)

  console.log(isCorrect)

  if(isCorrect) {
    // Calculate word's value
    const wordValue = state.currentWord.reduce((a, b) => { return a.value + b.value }, 0)

    console.log(wordValue)

    const newScore  = state.score + wordValue

    console.log(newScore)

    // Add word to foundWords
    const foundWords = state.foundWords + state.currentWord

    // Compose new state
    return Object.assign({}, state, { foundWords, newScore, wordValue, currentWord: [], selecting: false })
  } else {
    // Just reset currentWord
    return Object.assign({}, state, { currentWord: [], selecting: false })
  }

}

export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case TYPES.START_SELECTING_LETTERS:
      return Object.assign({}, state, { selecting: true })
    case TYPES.END_SELECTING_LETTERS:
      return submitWord(state)
    case TYPES.ADD_LETTER:
      const newWord = [ ...state.currentWord, Object.assign({}, action.letter) ]
      return Object.assign({}, state, {currentWord: newWord})
    default:
      return state
  }
}