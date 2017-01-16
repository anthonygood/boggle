import * as TYPES from "./action-types"
import makeGrid from "../lib/makeGrid"
import Checker from "../lib/Checker"

const GRID_SIZE = 4

const startGame = () => {
  const grid = makeGrid(GRID_SIZE)
  return {
    type: TYPES.START_GAME,
    grid
  }
}

const endGame = () => {
  return {
    type: TYPES.END_GAME
  }
}

const startSelectingLetters = () => {
  return {
    type: TYPES.START_SELECTING_LETTERS
  }
}

const addLetter = (letter) => {
  return {
    type: TYPES.ADD_LETTER,
    letter
  }
}

// submitWord will dispatch either SUBMIT_CORRECT_WORD or SUBMIT_INCORRECT_WORD
// according to the correctness of state.currentWord
const submitWord = (word) => {
  // Check that word is correct
  const currentWord = word.map(
    (letter) => { return letter.letter }
  ).join("").toLowerCase()

  if(Checker.check(currentWord)) {
    return { type: TYPES.SUBMIT_CORRECT_WORD }
  } else {
    return { type: TYPES.SUBMIT_INCORRECT_WORD }
  }
}

export default {
  startGame:             startGame,
  startSelectingLetters: startSelectingLetters,
  addLetter:             addLetter,
  submitWord:            submitWord,
  endGame:               endGame
}
