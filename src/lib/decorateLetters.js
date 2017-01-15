import LetterTile from "./LetterTile.js"

// Function takes a 2D array of letters and returns a new 2D array of LetterTile objects
function decorateLetters(grid){
  var matrix = [];

  //the letter constructor
  function Letter(letter, value, indices){
    this.letter = letter;
    this.value = value;
    this.indices = indices;
    this.letterMultiplier = 1;
    this.wordMultiplier = 1;
    this.getValue = function(){
      return this.value*this.letterMultiplier;
    }
    // method that returns an array of the surrounding .letter DOM objects
    this.getAdjacentDOMTiles = function(){
      var x = parseInt(this.indices[0]);
      var y = parseInt(this.indices[1]);
      var adjacentArray = [];

      //select each surrounding .hitbox in the DOM
      var i, j;
      for(i = x-1; i <= x+1; i++){
        for(j = y-1; j <= y+1; j++){

          //skip the currently selected letter
          if( i === x && j === y){ continue; }

          //select by data-indices
          adjacentArray.push( $('[data-indices="'+i+j+'"]') );
        }
      }
      return adjacentArray;
    }
    this.getDOMTile = function(){
      return $('[data-indices="' + this.indices + '"]').parent();
    },
    //method that returns an array of letterObjs
    this.getAdjacents = function(){
      var i, j;
      var x = parseInt(this.indices[0]);
      var y = parseInt(this.indices[1]);
      var adjacentArray = [];

      for(i = x-1; i <= x+1; i++){
        for(j = y-1; j <= y+1; j++){

          //skip the currently selected letter
          if( i < 0 || j < 0 || i > size-1 || j > size - 1 ) { continue; }

          if( i === x && j === y){ continue; }

          //select by data-indices
          adjacentArray.push( that.letters[i][j] );
        }
      }

      return adjacentArray;
    }
  }

  //a simple function that takes a letter and returns its value (via a switch)
  function getLetterValue(letter){
    var value;

    switch(letter){
      case "D":
      case "G":
      value = 2
      break;
      case "B":
      case "C":
      case "M":
      case "P":
      value = 3
      break;
      case "F":
      case "H":
      case "V":
      case "W":
      case "Y":
      value = 4
      break;
      case "K":
      value = 5
      break;
      case "J":
      case "X":
      value = 8
      break;
      case "Qu":
      case "Z":
      value = 10
      break;
      default: value = 1
      }
    return value;
  }

  //variables for looping over the array and sub-arrays
  var i, j;

  //loop through the array and sub-arrays
  for(i = 0; i<grid.length; i++){
    matrix[i] = [];
    for(j = 0; j<grid[i].length; j++){
      //take the letter string and make an object with it
      var selectedLetter = grid[i][j];
      var indices = ""+i+j;
      matrix[i][j] = new Letter(selectedLetter, getLetterValue(selectedLetter), indices);
    }
  }
  return matrix;
}