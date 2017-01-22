import Checker from "../lib/Checker"

const _wordAlreadyFound = (state, currentWordAsString) => {
  return state.foundWords.hasOwnProperty(currentWordAsString)
}

const _handleCorrectWord = (state, currentWordAsString, word) => {
  // currentWordAsString == "cat"
  //   state.currentWord == [{c}{a}{t}]
  // TODO:
  // Account for keyboard input? Or use separate function.
  const score = state.score + word.reduce((a,b) => { return a + b.value }, 0)

  let wordObj = {}
  wordObj[currentWordAsString] = word

  const foundWords = Object.assign({}, state.foundWords, wordObj)
  const lastSubmittedWord = { letters: word, status: "correct", asString: currentWordAsString }
  return Object.assign({}, state, { foundWords, score, lastSubmittedWord, pathForMouse: [], pathsForKeyboard: [], selecting: false })
}

const _handleIncorrectWord = (state, currentWordAsString, word) => {
  // TODO:
  // Keep a count of all words submitted?
  const lastSubmittedWord = { letters: word, status: "incorrect", asString: currentWordAsString }
  return Object.assign({}, state, { lastSubmittedWord, pathForMouse: [], pathsForKeyboard: [], selecting: false })
}

const _handleDuplicateWord = (state, currentWordAsString, word) => {
  const lastSubmittedWord = { letters: word, status: "duplicate", asString: currentWordAsString }
  return Object.assign({}, state, { lastSubmittedWord, pathForMouse: [], pathsForKeyboard: [], selecting: false })
}

const onSubmitWord = (state, currentWordAsString, bestPath) => {
  if (_wordAlreadyFound(state, currentWordAsString)) { return _handleDuplicateWord(state, currentWordAsString, bestPath) }
  else if (Checker.check(currentWordAsString))       { return _handleCorrectWord(state, currentWordAsString, bestPath)   }
  else                                               { return _handleIncorrectWord(state, currentWordAsString, bestPath) }
}

export default onSubmitWord
