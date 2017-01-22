// Keyboard methods so the user can play with a keyboard
// =====================================================
//
// As a player presses the keys, the appropriate letter tiles should be selected.
//
// In the (fairly likely) event of multiple tiles of the same letter,
// multiple paths are drawn on the board in parallel.
//
// In the case of 2 or more valid paths, the highest scoring path is submitted.

function KeyListener(game) {
  //cache the grid and matrix of letters
  var matrix = game.grid.matrix,
    letters = game.grid.letters;
  
  //DOM objects
  var $hitboxes = $('.hitbox'),
    $wordTop = $('.wordTop');
  
  var that = this;
  var game = game;
  //paths object should store all possible 'routes' a particular keypress might encompass
    
    
    //create new paths according to the last selected letter
    this.extendPaths = function( letter ){
      var newPaths = [];
      var i, j;
      //loop through paths array in reverse order
      for(i = that.paths.length-1 ; i>= 0; i--){
        //get the last object in each path, and inspect its letter
        var lastIndex = (that.paths[i].length)-1;
        
        //get the adjacents for the last letter of the path
        var adjacents = that.paths[i][ lastIndex ].getAdjacents();

        //loop through the possible adjacent letters
        for(j = adjacents.length - 1; j>= 0; j--){
        
          //if the adjacent matches the letter passed in
          //create a new path based on the old one
          if(adjacents[j].letter === letter){
          
            //validate the path is valid first
            if( validatePath( adjacents[j], that.paths[i] ) ){
              var newPath = that.paths[i].slice(0);
              //then push the adjacent into the newPath array
              newPath.push( adjacents[j] );
            
              //then push the newPath into the newPaths array
              newPaths.push( newPath );
            }             
          }
        }
      }
      //replace the old paths array with the new one
      that.paths = newPaths;
            
      //if no valid paths, assertBadWord
      if(that.paths.length === 0){
        game.assertBadWord();
      }
      that.updateRenderedPaths();
        
      //sub-function to check if a tile is already used in a given path
      //comparing one item to many
      function validatePath( letterObj, pathArray ){
        var i, j;
        
        for( i = pathArray.length -1; i >= 0; i--){
          //if the indices for the given letterObj are the same as any in the array
          if( letterObj.indices === pathArray[i].indices ){
            return false;
          }
        }
        
        return true;
      }
      
    };
    
    //method to update the grid according to available paths
    this.updateRenderedPaths = function(){
      
      //first, reset the classes of all tiles
      $(".letter-used").removeClass("letter-used");
      
      //then, loop through the paths array and sub-arrays
      var i, j;
      for(i = 0; i< that.paths.length; i++){
      
        for(j = 0; j<that.paths[i].length; j++){
        
          //add the .letter-used class for each tile in the array
          that.paths[i][j].getDOMTile().addClass("letter-used");
        }
      }
    };
    
    this.addPaths = function( array ){
        
        var i;
        //for each letterObj in array...
        for (i = 0; i< array.length; i++){
          //...create a new path object in memory
          var newPath = [];
          //push the letter object into the newPath. array
          newPath.push( array[i] );

          that.paths.push( newPath );
          
          //and highlight the tile on the board!
          array[i].getDOMTile().addClass("letter-used");
        }
        
      };
    //an array of Path objects
    this.paths = [];

    this.addKeyboard = function(){
      $(document).off( "keydown" );
      $(document).on( "keydown", this.keyPress );
    };

    
    this.evaluateKeyPress = function(k){
      switch(k) {
        case 8: k = -1
        break
        case 13: k = true
        break;
        case 65: k = 'A' 
        break;
        case 66: k = 'B' 
        break;
        case 67: k = 'C' 
        break;
        case 68: k = 'D' 
        break;
        case 69: k = 'E'
        break;
        case 70: k = 'F'
        break;
        case 71: k = 'G'
        break;
        case 72: k = 'H'
        break;
        case 73: k = 'I'
        break;
        case 74: k = 'J'
        break;
        case 75: k = 'K'
        break;
        case 76: k = 'L'
        break;
        case 77: k = 'M'
        break;
        case 78: k = 'N'
        break;
        case 79: k = 'O'
        break;
        case 80: k = 'P'
        break;
        case 81: k = 'Qu'
        break;
        case 82: k = 'R'
        break;
        case 83: k = 'S'
        break;
        case 84: k = 'T'
        break;
        case 85: k = 'U'
        break;
        case 86: k = 'V'
        break;
        case 87: k = 'W'
        break;
        case 88: k = 'X'
        break;
        case 89: k = 'Y'
        break;
        case 90: k = 'Z'
        break;
        
        default: k = false
      }
      return k;       
    };
    
    
    //a method to search the grid for a given letter
    // returns an array of letterObjs
    // or false, if the letter isn't in the grid
    this.searchGridForLetter = function(letter){
      var array = [];
      var i, j;
      
      //loop through 2d array
      for (i = 0; i<matrix.length; i++){
        for (j = 0; j<matrix.length; j++){
          
          //check whether the letter is present
          if ( matrix[i][j] === letter ) { 
            //if so, add the letter to the array
            array.push(letters[i][j]);

            }
            
        }

      }
      if (array.length === 0){console.log("Letter not found"); game.assertBadWord(); return false; }
      return array;
    };

    //method to parse the paths into wordObjs
    //returns the highest value wordObj possible, or false if no such word
    this.parsePaths = function(){
      var i, j;
      var parsedWords = [];
      //for each path...
      for(i = 0; i< that.paths.length; i++){
      
        //reset the game's currentWord, need to hijack it to parse our wordObjs
        game.currentWord.reset();
      
        var thisPath = that.paths[i];
        //loop over the given path array
        for(j = 0; j< thisPath.length; j++){
        
          //add the letterObj to the currentWord
          game.currentWord.addLetter( thisPath[j] );
                    
        }
        //push the new currentWord into the array
        //need a deep copy
        var parsedWord = $.extend( true, {}, game.currentWord );
        parsedWords.push( parsedWord );
      }
      //return the array of parsedWords
      return parsedWords;
    };
    
    this.keyPress = function(key){
      var availablePaths = [];
      //first, turn the js keycode into descriptive name
      var letter = that.evaluateKeyPress(key.keyCode);
      //check whether return or backspace were pressed
      //return if no valid key is pressed
      if(letter === false) { return; }
      if(letter === true) { 
        
        if(game.currentWord.word !== ''){
          var wordObjArray = that.parsePaths();
          //sort the parsedWords by score
          wordObjArray.sort( function(a,b) { return b.getValue() - a.getValue(); }  );
          
          //and submit the highest value word
          game.currentWord = wordObjArray[0];
          game.submitCurrentWord();
          
          //revert paths
          that.paths = [];
          
          return; 
        }
        return;
      }
      else if(letter === -1) { console.log("Backspace key pressed, undo(){...}"); return; }
      //stop animations
      $('.wordTop').finish().removeClass("correct wrong duplicate");
      //deactivate .hitboxes from clicking events
      $('.hitbox').off();
      
      console.log("keyPress");
      //append the letter to .wordTop
      $('.wordTop').append( letter );
      
      //if there is no currentWord...
      if( game.currentWord.word === '' ) { 
        //...search the board
        console.log("No current word, searchGridForLetter(){...}"); 
        availablePaths = that.searchGridForLetter( letter );
        
        //if the letter is found, and there are paths available, add the letter to the currentWord
        if( availablePaths ) {
          that.addPaths( availablePaths );
          
          //add the letter to the currentWord
          game.currentWord.addLetter( letter, false );
        }
      } // end if
      //otherwise, search current paths
      else {
    
        
        game.currentWord.addLetter( letter, false );
        that.extendPaths( letter );
      }
      
    };

};