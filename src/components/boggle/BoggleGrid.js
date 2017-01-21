import React, { Component } from "react"
import BoggleTile from "./connected-boggle-tile"

class BoggleGrid extends Component {
  render() {
    const { selecting } = this.props
    const letterIds = this._currentWordLetterIDs()

    return (
      <div className="BoggleGrid">
        {this.props.grid.map ((row, rid) =>
          <div className="row" key={rid}>
            {row.map ((tile, tid) =>
              <BoggleTile key={tile.x}
                          isSelected={this._isTileSelected(tile, letterIds)}
                          isLastSelected={this._isLastSelected(tile, letterIds)}
                          selecting={selecting}
                          currentWord={this.props.currentWord}
                          {...tile} />
            )}
          </div>
        )}

      </div>
    )
  }

  _currentWordLetterIDs() {
    return this.props.currentWord.map(
      (tile) => { return tile._id }
    )
  }

  _isTileSelected(tile, ids) {
    if(!this.props.selecting) { return false }
    return ids.indexOf(tile._id) > -1
  }

  _isLastSelected(tile, ids) {
    if(!this.props.selecting) { return false }
    return ids[ids.length-1] === tile._id
  }
}

export default BoggleGrid
