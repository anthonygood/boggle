import React, { Component } from 'react';
import BoggleTile from "./BoggleTile.js";
import makeGrid from "../../lib/makeGrid.js";

class BoggleGrid extends Component {
  constructor(props) {
    super(props)

    this.grid = makeGrid(props.size)
  }

  render() {
    window.grid = this.grid
    return (
      <div className="BoggleGrid">

        {this.grid.map ((row, rid) =>
          <div className="row" key={rid}>
            {row.map ((tile, tid) =>
              <BoggleTile key={tid} letter={tile}/>
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
