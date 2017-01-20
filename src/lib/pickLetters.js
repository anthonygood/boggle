// Function for generating a random selection of letters with good distribution
//
// import pick from 'pickLetters.js'
// pick(4)
//
// returns an array: ["A", "I", "T", "M"]
//
export default (totalLetters)=>{
  const consonants     = "BBCCDDDDFFGGHHHHHJKLLLLMMNNNNNNNPPQRRRRRRRSSSSSSTTTTTTTTTTVVWWWXYYYZ",
        vowels         = "AAAAEEEEEEEIIIOOOUU",
        numberOfVowels = Math.floor((totalLetters*0.4)-1)

  let letterBag = []

  // put some vowels into our letterBag
  while(letterBag.length <= numberOfVowels){
    const random = Math.floor(Math.random() * vowels.length)
    letterBag.push(
      vowels.slice(random, random+1)
    );
  }

  // fill up the letterBag with the consonants
  while(letterBag.length < totalLetters){
    const random = Math.floor(Math.random() * consonants.length)

    // remove the random letter and store in a variable
    let chosenLetter = consonants.slice(random, random+1)

    chosenLetter = consonants[random]
    letterBag.push(chosenLetter)
  }
  return letterBag
}
