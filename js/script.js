const guessLetterList = document.querySelector(".guessed-letters"); //ul li entered letters
const guessButton = document.querySelector(".guess"); //guess button
const letterInputBox = document.querySelector(".letter"); //letter input box 
const wordInProgress = document.querySelector(".word-in-progress"); //paragraph for in progress word
const remainGuess = document.querySelector(".remaining"); //paragraph for remaining guesses
const remainGuessSpan = document.querySelector(".remaining span"); //paragraph span for remaining guesses 
const message = document.querySelector(".message"); //paragraph for messages
const playAgainButton = document.querySelector(".play-again"); // play again button (hidden)
const word = "magnolia";
const guessedLetters = [];



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
 message.innerText= "";
 const inputLetter = letterInputBox.value;
 const validatedInput = playerInput(inputLetter);
 if (validatedInput) { //I think this checks to see if anything has been returned, i.e. if input passed validation and was passed to this variable?
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
    }
    
};

const makeGuess = function(inputLetter) {
 inputLetter = inputLetter.toUpperCase();
  if (guessedLetters.includes(inputLetter)) {
  	message.innerText = "This letter has already been guessed, please try a different letter";
 } else {
 	guessedLetters.push(inputLetter);
    console.log(guessedLetters); 
}};

