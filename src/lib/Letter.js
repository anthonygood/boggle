class Letter {
  constructor(letter, {multiplier = 1, x = 0, y = 0} = {}) {
    this._letter = letter
    this._multiplier = multiplier
    this._x = x
    this._y = y
  }

  toString() {
    const letter = this._letter.toUpperCase()
    return letter === "Q" ? "Qu" : letter
  }

  toJSON() {
    return {
      _id:        this._id(),
      letter:     this.toString(),
      baseValue:  this._baseValue(),
      multiplier: this._multiplier,
      value:      this.value(),
      x:          this._x,
      y:          this._y
    }
  }

  value() {
    return this._baseValue() * this._multiplier
  }

  _baseValue() {
    switch(this.toString()){
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

  _id() {
    return "" + this._x + this._y
  }
}

export default Letter
