// Function for generating boggle grids. Takes a single argument, "size",
// which determines the number of rows (all grids are square!)
//
// import makeGrid from "makeGrid.js"
// makeGrid(4)
//
// returns a two dimensional array of strings:
// [['A','B','C','D'], ['E','F','G','H'], ['I','J','K','L'], ['M','N','O','P']]
//
import shuffle from "./shuffle.js"
import pickLetters from "./pickLetters.js"
import Letter from "./Letter.js"

export default (size)=>{

  let letters = shuffle(
    pickLetters(size * size)
  )

  let grid = [], i, j

  for(i=0; i<size; i++){
    let row = []
    grid[i] = row

    for(j=0; j<size; j++){

      // TODO:
      // Handle passing in bonus multipliers
      const letter = new Letter(
        letters.pop(),
        { x: j, y: i }
      )

      row[j] = letter.toJSON()
    }
  }

  return grid
}
