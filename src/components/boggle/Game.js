import React, { Component } from "react"
import CurrentScore from "../boggle/CurrentScore"
import CurrentWord from "../boggle/CurrentWord"
import BoggleGrid from "../boggle/BoggleGrid"


// Top-level component for during gameplay
class Game extends Component {
  render() {
    return (
      <div className="Game">
        <CurrentScore score={ this.props.score } />
        <CurrentWord
          pathForMouse={ this.props.pathForMouse }
          pathsForKeyboard={ this.props.pathsForKeyboard }
          lastSubmittedWord={ this.props.lastSubmittedWord } />
        <BoggleGrid { ...this.props } />
      </div>
    );
  }

  componentWillMount() {
    window.game = this
    // Cache Hitbox lookup for dealing with touchmove
    this.hitboxes = document.getElementsByClassName("Hitbox")

    document.addEventListener("mousedown", this._onMouseDown.bind(this))
    document.addEventListener("mouseup",   this._onMouseUp.bind(this))
    document.addEventListener("keydown",   this._onKeyDown.bind(this))

    // document.addEventListener("touchstart", this._onTouchStart.bind(this))
    // document.addEventListener("touchmove",  this._onTouchMove.bind(this))
    // document.addEventListener("touchend",   this._onTouchEnd.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup")
    document.removeEventListener("mousedown")
    document.removeEventListener("keydown")

    document.removeEventListener("touchstart")
    document.removeEventListener("touchend")
  }

  _onMouseDown() {
    // Prevent mouse selection if current keyboard paths are present
    if(!this.props.pathsForKeyboard.length) {
      this.props.actions.startSelectingLetters()
    }
  }

  _onMouseUp() {
    this.props.actions.submitWord()
  }

  _onKeyDown(event) {
    this.props.actions.keyPress(event.key)
  }

  // _onTouchStart(e) {
  //   e.preventDefault()
  //   this._onMouseDown()
  // }

  // _onTouchMove(e) {
  //   e.preventDefault()

  //   const lastTouch = e.changedTouches[0]
  //   const xy = [lastTouch.clientX, lastTouch.clientY]

  //   const x = lastTouch.clientX
  //   const y = lastTouch.clientY

  //   // console.log(xy)

  //   // Find the hitbox the touch event is currently over
  //   // const hitboxes = document.getElementsByClassName("Hitbox")

  //   const hitbox = this._detectInHTMLCollection(
  //     this.hitboxes,
  //     (item) => {
  //       const rect = item.getBoundingClientRect()

  //       const isInX = (rect.left < x) && (x < rect.right)
  //       const isInY = (rect.top < y) && (y < rect.bottom)

  //       return isInX && isInY
  //     }
  //   )

  //   if (hitbox) {
  //     const id = hitbox.attributes["data-id"].value
  //     const [x, y] = id.split("")

  //     const letter = this.props.grid[y][x]

  //     console.log(letter)

  //     this.props.actions.addLetter(letter)
  //   }
  // }

  // _onTouchEnd(e) {
  //   e.preventDefault()
  //   this._onMouseUp()
  // }

  // Returns an item from HTML collection if the passed callback returns true.
  // _detectInHTMLCollection(collection, callback) {
  //   const limit = collection.length - 1
  //   let   i = 0,
  //         bool

  //   for(i; i < limit; i++) {
  //     const item = collection[i]
  //     if(callback(item)) {
  //       return item
  //     }
  //   }
  // }
}

export default Game