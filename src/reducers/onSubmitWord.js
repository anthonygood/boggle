import Checker from "../lib/Checker"

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

export default onSubmitWord
