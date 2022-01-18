const guessLetterList = document.querySelector(".guessed-letters"); //ul li entered letters
const guessButton = document.querySelector(".guess"); //guess button
const letterInputBox = document.querySelector(".letter"); //letter input box 
const wordInProgress = document.querySelector(".word-in-progress"); //paragraph for in progress word
const remainGuess = document.querySelector(".remaining"); //paragraph for remaining guesses
const remainGuessSpan = document.querySelector(".remaining span"); //paragraph span for remaining guesses 
const message = document.querySelector(".message"); //paragraph for messages
const playAgainButton = document.querySelector(".play-again"); // play again button (hidden)

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
   const request = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
   const data = await request.text(); 
   const wordArray = data.split("\n"); //
   const randomWordIndex = Math.floor(Math.random() * wordArray.length);
   word = wordArray[randomWordIndex].trim();
   placeholderCircle(word);
};

getWord(); 

const placeholderCircle = function(word) {
  const numOfLetters = [];
  for (const letters of word) {
 	console.log(letters);
 	numOfLetters.push("●");
 };
 wordInProgress.innerText = numOfLetters.join("");
};

//placeholderCircle(word);

guessButton.addEventListener("click", function(e){
 e.preventDefault();
 message.innerText= "";
 const inputLetter = letterInputBox.value;
 const validatedInput = playerInput(inputLetter);
 if (validatedInput) { 
 	makeGuess(inputLetter);}
letterInputBox.value = "";
});

const playerInput = function(input) { 
 const acceptedLetter = /[a-zA-Z]/;
 if (input.length === 0) {
 	message.innerText = "Please input a letter";
    } else if (input.length >1) {
    	message.innerText = "Please only put in one letter.";
    } else if (!input.match(acceptedLetter)) {
    	message.innerText = "Only letters are allowed.";
    } else {return input;
}};

const makeGuess = function(inputLetter) {
 inputLetter = inputLetter.toUpperCase();
  if (guessedLetters.includes(inputLetter)) {
  	message.innerText = "This letter has already been guessed, please try a different letter";
 } else {
 	guessedLetters.push(inputLetter);
    console.log(guessedLetters); 
    displayGuessedLetters();
    countGuess(inputLetter);//doesn't like the parameter
    updateWordInProgress(guessedLetters);

}};

const displayGuessedLetters = function(){
   guessLetterList.innerHTML = "";
   for (const letter of guessedLetters ) {
   const li = document.createElement("li"); //should this be a new variable name? same for next line
   li.innerText = letter;
   guessLetterList.append(li);
}};

const updateWordInProgress = function(guessedLetters){
 const wordUpper = word.toUpperCase();
 const wordArray = wordUpper.split("");
 const revealWord = [];
// console.log(wordArray);
 for (const letter of wordArray) {
   if (guessedLetters.includes(letter)){
      revealWord.push(letter.toUpperCase());

 } else {
   revealWord.push("●");
}
wordInProgress.innerText = revealWord.join("");
checkWin();
}};

const countGuess = function(inputLetter) {
    const upperWord =  word.toUpperCase(); 
    if (upperWord.includes(inputLetter)) {
      message.innerText = `Yay! ${inputLetter} is in the word!`;
    } else {
      message.innerText = `Oh no! ${inputLetter} is not in the word, you've lost one turn.`
      remainingGuesses-=1;
    }

    if (remainingGuesses === 0 ){
      message.innerText = `Game is over! The word was ${word}.`;
      remainGuessSpan.innerText = `${remainingGuesses} guesses`; //not in skillcrush instructions yet
    } else if (remainingGuesses === 1){
      remainGuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
      remainGuessSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function(){
 if (word.toUpperCase() === wordInProgress.innerText) {
   message.classList.add("win");
  message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
 }
};