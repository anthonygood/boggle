// Function for generating boggle grids.
//
// import makeGrid from "makeGrid.js"
// makeGrid(size)
//
// returns a two dimensional array of strings:
// [['A', 'B', 'C', 'D'], ['E','F','G','H'], ['I','J','K','L'], ['M','N','O','P']]
//
import shuffle from "./shuffle.js"
import pickLetters from "./pickLetters.js"

export default (size)=>{
  let i, j;
  function fillGrid(size, letters){
    var grid = new Array(size);
    for(i=0; i<size; i++){

      //create sub-arrays for each row
      grid[i] = new Array(size);

      //for each row, fill the array with letters
      for(j=0; j<size; j++){

        grid[i][j] = letters.pop();
      }
    }
    return grid;
  }

  var letters = pickLetters(size*size);
  shuffle(letters);
  var grid = fillGrid(size, letters);
  return grid;
}