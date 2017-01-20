// Function to determine if two tiles are adjacent.
const areAdjacent = (first, second) => {
  // True if there is no previous letter.
  if (typeof second === "undefined") { return true }

  const x = Math.abs(first.x - second.x)
  const y = Math.abs(first.y - second.y)

  return (x < 2) && (y < 2)
}

export default areAdjacent
