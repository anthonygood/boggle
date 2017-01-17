import React, { Component } from "react"
import BoggleTile from "./connected-boggle-tile"

class BoggleGrid extends Component {
  constructor(props) {
    super(props)
    window.bg = this
  }

  render() {
    const { selecting } = this.props

    return (
      <div className="BoggleGrid">
        {this.props.grid.map ((row, rid) =>
          <div className="row" key={rid}>
            {row.map ((tile, tid) =>
              <BoggleTile key={tile.x} isSelected={this._isTileSelected(tile)} selecting={selecting} {...tile}/>
            )}
          </div>
        )}

      </div>
    )
  }

  _isTileSelected(tile) {
    const ids = this.props.currentWord.map(
      (tile) => { return tile._id }
    )

    return ids.indexOf(tile._id) > -1
  }
}

export default BoggleGrid
