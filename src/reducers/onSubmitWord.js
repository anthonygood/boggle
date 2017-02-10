import Checker from "../lib/Checker"

const _wordAlreadyFound = (state, currentWordAsString) => {
  return state.foundWords.hasOwnProperty(currentWordAsString)
}

const _lengthBonus = (length) => {
  switch(length) {
    case 1:
    case 2:
      return 0
    case 3:
      return 1
    case 4:
      return 2
    case 5:
      return 3
    case 6:
      return 5
    case 7:
      return 8
    case 8:
      return 10
    case 9:
      return 15
    default:
      return 20
  }
}

// `word` parameter should be array of letters.
const _scoreWord = (word) => {
  const baseScore  = word.reduce((a,b) => { return a + b.value }, 0)
  const multiplier = word.reduce((greatest, next) => {
    // Protect against undefined word_multiplier
    if(!next.word_multiplier) { return greatest }

    return greatest > next.word_multiplier ? greatest : next.word_multiplier
  }, 1)

  const lengthBonus = _lengthBonus(word.length)

  return (baseScore + lengthBonus) * multiplier
}

const _handleCorrectWord = (state, currentWordAsString, word) => {
  // currentWordAsString == "cat"
  //   state.currentWord == [{c}{a}{t}]
  const score = state.score + _scoreWord(word)

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
