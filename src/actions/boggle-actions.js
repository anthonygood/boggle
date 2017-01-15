import * as TYPES from "./action-types"

const startSelectingLetters = () => {
  console.log("boggle-actions:startSelectingLetters")
  return {
    type: TYPES.START_SELECTING_LETTERS
  }
}

const endSelectingLetters = () => {
  return {
    type: TYPES.END_SELECTING_LETTERS
  }
}

const addLetter = (letter) => {
  return {
    type: TYPES.ADD_LETTER,
    letter
  }
}

export default {
  startSelectingLetters: startSelectingLetters,
  endSelectingLetters:   endSelectingLetters,
  addLetter:             addLetter
}
