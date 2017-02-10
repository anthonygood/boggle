import * as TYPES from "./action-types"
import * as config from "../config"

console.warn(config.API_END_POINT)

const play = (gameJSON) => {
  return {
    type: TYPES.START_GAME,
    grid: gameJSON.board,
    words: gameJSON.words,
    wordCount: gameJSON.word_count,
    totalScore: gameJSON.total_score
  }
}

const fetchGrid = () => {
  return fetch(`${config.API_END_POINT}/grid`).then(response => {
    return response.json().then(json => json)
  }).catch(error => {
    throw error
  })
}

// `error` is the exception that was raised,
// `action` refers to the action which caused it.
const serverError = (error, action) => {
  // Pass original error along with the action it has thwarted.
  return { type: TYPES.SERVER_ERROR, actionError: action, error }
}

const startGame = () => {
  return (dispatch) => {
    return fetchGrid().then(json => {
      return dispatch(play(json))
    }).catch(error => {
      // Annotate error
      error.message = "action creator startGame failed: " + error.message
      return dispatch(serverError(error, TYPES.START_GAME))
    })
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
