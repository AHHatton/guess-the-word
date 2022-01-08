const guessLetterList = document.querySelector(".guessed-letters"); //ul li entered letters
const guessButton = document.querySelector(".guess"); //guess button
const letterInputBox = document.querySelector(".letter"); //letter input box 
const wordInProgress = document.querySelector(".word-in-progress"); //paragraph for in progress word
const remainGuess = document.querySelector(".remaining"); //paragraph for remaining guesses
const remainGuessSpan = document.querySelector(".remaining span"); //paragraph span for remaining guesses 
const message = document.querySelector(".message"); //paragraph for messages
const playAgainButton = document.querySelector(".play-again"); // play again button (hidden)
const word = "magnolia";

const placeholderCircle = function(word) {
  const numOfLetters = [];
  for (const letters of word) {
 	console.log(letters);
 	numOfLetters.push("●");
 };

 wordInProgress.innerText = numOfLetters.join("");

};

placeholderCircle(word);

guessButton.addEventListener("click", function(e){
 e.preventDefault();
 const inputLetter = letterInputBox.value;
 console.log(inputLetter);
 letterInputBox.value = "";
});