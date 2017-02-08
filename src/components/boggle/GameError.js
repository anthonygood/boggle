import React, { Component } from "react"
import BoggleTile from "./connected-boggle-tile"

export default (props) => {
  return (
    <div className="Game">
      <div className="BoggleError PreviousWord incorrect">error</div>
      {[1,2,3,4].map((row) =>
        <div className="row" key={row}>
          {[1,2,3,4].map((letter) =>
            <BoggleTile key={letter} {...props} />
          )}
        </div>
      )}
    </div>
  )
}
