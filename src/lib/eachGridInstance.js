// Yields every grid instance of a particular letter to the passed callback.
//
// eg:
// _eachGridInstance(grid, "A", (letterA) => { doSomethingWith(letterA)})
export default (grid, letter, fn) => {
  let formattedLetter = letter === "q" ? "Qu" : letter.toUpperCase()
  grid.forEach((row) => {
    row.forEach((gridLetter) => {
      if(gridLetter.letter === formattedLetter) {
        fn(gridLetter)
      }
    })
  })
}
