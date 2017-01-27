// Function for generating a random selection of letters with good distribution
//
// import pick from 'pickLetters.js'
// pick(4)
//
// returns an array: ["A", "I", "T", "M"]
//

const rand = (max) => {
  return Math.floor(
    Math.random() * max
  )
}

export default (totalLetters) => {
  let   consonants     = "BBCCCCDDDDFFGGGHHHHHJKKLLLLLMMMNNNNNNNNPPQRRRRRRRRRSSSSSSSTTTTTTTTTTVVWWWXYYYZ".split(""),
        vowels         = "AAAAEEEEEEEIIIOOOUU".split("")
  const numberOfVowels = Math.floor(
    ( totalLetters * 0.4 ) - 1
  )

  let letterBag = []

  // put some vowels into our letterBag
  while(letterBag.length <= numberOfVowels){
    const random = rand(vowels.length)

    letterBag.push(
      // vowels.slice(random, random+1)
      vowels.splice(random, 1).toString()
    )
  }

  // fill up the letterBag with the consonants
  while(letterBag.length < totalLetters){
    const random = rand(consonants.length)

    letterBag.push(
     consonants.splice(random, 1).toString()
    )
  }
  return letterBag
}
