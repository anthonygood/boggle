import React, { Component } from "react"
import BoggleTile from "./connected-boggle-tile"

class BoggleGrid extends Component {
  render() {
    const { selecting } = this.props
    const mouseLetterIds = this._currentMouseWordLetterIDs()
    const keyboardLetterIds = this._currentKeyboardLetterIDs()

    return (
      <div className="BoggleGrid" onTouchMove={this._onTouchMove.bind(this)}>
        {this.props.grid.map ((row, rid) =>
          <div className="row" key={rid}>
            {row.map ((tile, tid) =>
              <BoggleTile key={tile.x}
                          isSelected={this._isTileSelected(tile, mouseLetterIds)}
                          isLastSelected={this._isLastSelected(tile, mouseLetterIds)}
                          isSelectedKeyboard={this._isTileSelectedKeyboard(tile, keyboardLetterIds)}
                          isLastSelectedKeyboard={this._isLastSelectedKeyboard(tile, keyboardLetterIds)}
                          selecting={selecting}
                          pathForMouse={this.props.pathForMouse}
                          pathsForKeyboard={this.props.pathsForKeyboard}
                          {...tile} />
            )}
          </div>
        )}

      </div>
    )
  }

  componentWillMount() {
    // Cache Hitbox lookup for dealing with touchmove
    this.hitboxes = document.getElementsByClassName("Hitbox")

    document.addEventListener("touchstart", this._onTouchStart.bind(this))
    document.addEventListener("touchmove",  this._onTouchMove.bind(this))
    document.addEventListener("touchend",   this._onTouchEnd.bind(this))
  }

  _currentMouseWordLetterIDs() {
    return this.props.pathForMouse.map(
      (tile) => { return tile._id }
    )
  }

  _currentKeyboardLetterIDs() {
    return this.props.pathsForKeyboard.map((path) => {
      return path.map((letter) => {
        return letter._id
      })
    })
  }

  _isTileSelected(tile, ids) {
    if(!this.props.selecting) { return false }
    return ids.indexOf(tile._id) > -1
  }

  _isLastSelected(tile, ids) {
    if(!this.props.selecting) { return false }
    return ids[ids.length-1] === tile._id
  }

  _isTileSelectedKeyboard(tile, ids) {
    // Use concat to flatten arrays
    return [].concat(...ids).indexOf(tile._id) > -1
  }

  _isLastSelectedKeyboard(tile, ids) {
    return ids.map((path) => {
      return path[path.length-1] === tile._id
    }).indexOf(true) > -1
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

  _onTouchStart(e) {
    e.preventDefault()
    this._onMouseDown()
  }

  // Detect and submit tiles being touched.
  _onTouchMove(e) {
    console.log("touchmove")
    e.preventDefault()

    const lastTouch = e.changedTouches[0]
    const xy = [lastTouch.clientX, lastTouch.clientY]

    const x = lastTouch.clientX
    const y = lastTouch.clientY

    // console.log(xy)

    // Find the hitbox the touch event is currently over
    // const hitboxes = document.getElementsByClassName("Hitbox")

    const hitbox = this._detectInHTMLCollection(
      this.hitboxes,
      (item) => {
        const rect = item.getBoundingClientRect()

        const isInX = (rect.left < x) && (x < rect.right)
        const isInY = (rect.top < y) && (y < rect.bottom)

        return isInX && isInY
      }
    )

    if (hitbox) {
      const id = hitbox.attributes["data-id"].value
      const [x, y] = id.split("")

      const letter = this.props.grid[y][x]

      console.log(letter)

      if(!this._isTileSelected(letter, this._currentMouseWordLetterIDs())) {
        this.props.actions.addLetter(letter)
      }
    }
  }

  _onTouchEnd(e) {
    e.preventDefault()
    this._onMouseUp()
  }

  _detectInHTMLCollection(collection, callback) {
    const limit = collection.length - 1
    let   i = 0,
          bool

    for(i; i < limit; i++) {
      const item = collection[i]
      if(callback(item)) {
        return item
      }
    }
  }

}

export default BoggleGrid
