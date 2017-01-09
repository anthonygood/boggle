import React, { Component } from 'react';
import BoggleTile from "./BoggleTile.js";

class BoggleGrid extends Component {
  constructor(props) {
    super(props)

    this.grid = this._generateGrid(props.size)
  }

  render() {
    window.bg = this
    return (
      <div className="BoggleGrid">

        {this.grid.map ((row, rid) =>
          <div className="row">
            {row.map ((tile, tid) =>
              <BoggleTile />
            )}
          </div>
        )}

      </div>
    );
  }

  _generateGrid(size) {
    let grid = [],
        row;

    for(let r = 0; r < size; r++) {
      row = []
      for(let c = 0; c < size; c++) {
        row.push(`${r}${c}`)
      }
      grid.push(row)
    }

    return grid
  }
}

export default BoggleGrid
