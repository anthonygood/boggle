// simple function for generating a random selection of letters with good distribution
//
// import pick from 'pickLetters.js'
// pick(4)
export default (totalLetters)=>{
  const consonants = "BBCCDDDFFGGHHHHHJKLLLLMMNNNNNNPPQRRRRRSSSSSSTTTTTTTTTVVWWWXYYYZ",
        vowels = "AAAAAEEEEEIIIOOOUU",
        numberOfVowels = Math.ceil((totalLetters*0.5)-1);

  let letterBag = [];

  // put some vowels into our letterBag
  while(letterBag.length <= numberOfVowels){
    const random = Math.floor(Math.random()* vowels.length);
    letterBag.push(
      vowels.slice(random, random+1)
    );
  }

  // fill up the letterBag with the consonants
  while(letterBag.length < totalLetters){
    const random = Math.floor(Math.random() * consonants.length);

    // remove the random letter and store in a variable
    let chosenLetter = consonants.slice(random, random+1);

    // special case for "Q"!
    chosenLetter = chosenLetter === "Q" ? "Qu" : consonants[random];
    letterBag.push(chosenLetter);
  }
  return letterBag;
}
