import React, { Component } from "react"
import BoggleTile from "./connected-boggle-tile"

class BoggleGrid extends Component {
  render() {
    const { selecting } = this.props
    const mouseLetterIds = this._currentMouseWordLetterIDs()
    const keyboardLetterIds = this._currentKeyboardLetterIDs()

    return (
      <div className="BoggleGrid">
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
}

export default BoggleGrid
