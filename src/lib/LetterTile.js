class LetterTile {
  constructor(letter, multiplier) {
    this.letter = letter
    this.multiplier = multiplier || 1
  }

  value() {
    return this._baseValue() * this.multiplier
  }

  _baseValue() {
    switch(this.letter){
      case "D":
      case "G":
        return 2
      case "B":
      case "C":
      case "M":
      case "P":
        return 3
      case "F":
      case "H":
      case "V":
      case "W":
      case "Y":
        return 4
      case "K":
        return 5
      case "J":
      case "X":
        return 8
      case "Qu":
      case "Z":
        return 10
      default: return 1
    }
  }
}

export default LetterTile
