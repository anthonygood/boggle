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

const submitWord = (word) => {
  return { type: TYPES.SUBMIT_WORD }
}

export default {
  startGame:             startGame,
  startSelectingLetters: startSelectingLetters,
  addLetter:             addLetter,
  submitWord:            submitWord,
  endGame:               endGame
}
