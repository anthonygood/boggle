import * as TYPES from "./action-types"
import makeGrid from "../lib/makeGrid"

const GRID_SIZE = 4

const play = (gameJSON) => {
  window.grid = makeGrid(4)
  return {
    type: TYPES.START_GAME,
    grid: gameJSON.board,
    words: gameJSON.words,
    wordCount: gameJSON.word_count,
    totalScore: gameJSON.total_score
  }
}

const fetchGrid = () => {
  return fetch("http://localhost:4000/grid").then(response => {
    return response.json().then(json => json)
  }).catch(error => {
    throw error
  })
}

const startGame = () => {
  return (dispatch) => {
    return fetchGrid().then((json) => {
      return dispatch(play(json))
    }).catch(error => { throw error })
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

const keyPress = (letter) => {
  if(letter === "Enter") {
    return { type: TYPES.SUBMIT_WORD }
  } else {
    return {
      type: TYPES.ADD_LETTER_KEYBOARD,
      letter
    }
  }
}

export default {
  startGame:             startGame,
  startSelectingLetters: startSelectingLetters,
  addLetter:             addLetter,
  submitWord:            submitWord,
  endGame:               endGame,
  keyPress:              keyPress
}
