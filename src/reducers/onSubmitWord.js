import Checker from "../lib/Checker"

const _wordAlreadyFound = (state, currentWordAsString) => {
  return state.foundWords.hasOwnProperty(currentWordAsString)
}

const _handleCorrectWord = (state, currentWordAsString) => {
  // currentWordAsString == "cat"
  //   state.currentWord == [{c}{a}{t}]
  const word  = state.currentWord
  const score = state.score + word.reduce((a,b) => { return a + b.value }, 0)

  let wordObj = {}
  wordObj[currentWordAsString] = word

  const foundWords = Object.assign({}, state.foundWords, wordObj)
  const lastSubmittedWord = { letters: state.currentWord, status: "correct" }
  return Object.assign({}, state, { foundWords, score, lastSubmittedWord, currentWord: [], selecting: false })
}

const _handleIncorrectWord = (state, currentWordAsString) => {
  // TODO:
  // Keep a count of all words submitted?
  const lastSubmittedWord = { letters: state.currentWord, status: "incorrect" }
  return Object.assign({}, state, { lastSubmittedWord, currentWord: [], selecting: false })
}

const _handleDuplicateWord = (state, currentWordAsString) => {
  const lastSubmittedWord = { letters: state.currentWord, status: "duplicate" }
  return Object.assign({}, state, { lastSubmittedWord, currentWord: [], selecting: false })
}

const onSubmitWord = (state, currentWordAsString) => {
  if (_wordAlreadyFound(state, currentWordAsString)) { return _handleDuplicateWord(state, currentWordAsString) }
  else if (Checker.check(currentWordAsString))       { return _handleCorrectWord(state, currentWordAsString)   }
  else                                               { return _handleIncorrectWord(state, currentWordAsString) }
}

export default onSubmitWord
