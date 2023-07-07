
//  start generating letters
const letters = "abcdefghijklmnopqrstuvwxyz+";

let letterArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

letterArray.forEach((letter) => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";

    lettersContainer.appendChild(span);
});
//  end generating letters



//  Object of categories contain array of words

const words = {
    programming: ["C++", "Java", "Python", "JavaScript", "Ruby", "Go", "PHP", "Swift", "Rust", "TypeScript"],
    movies: ["Inception", "The Shawshank Redemption", "Pulp Fiction", "The Dark Knight", "Fight Club", "The Matrix", "Interstellar", "Forrest Gump", "The Godfather", "Titanic"],
    countries: ["United States", "Canada", "Germany", "Japan", "Brazil", "Australia", "India", "China", "France", "Mexico"],
    people: ["Mohammed", "Fatima", "Ali", "Zainab", "Ahmed", "Noor", "Aisha", "Yousef", "Sara", "Abdullah"]
};

// get random property

const allKeys = Object.keys(words); // return array of keys
let randomPropNumber = Math.floor(Math.random() * allKeys.length); // 0 <= number < allKeys.length
let randomPropName = allKeys[randomPropNumber]; // categorie (programming for example)
let randomPropValue = words[randomPropName] // value of the key (programming) the array

let randomNumberFromRandomArray = Math.floor(Math.random() * randomPropValue.length) //  0 <= number < 9
let randomNameFromRandomArray = randomPropValue[randomNumberFromRandomArray] // retrun value from the array for example c++ or Mohamed or canada 
console.log(randomNameFromRandomArray);
// set category info
document.querySelector(".game-info span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomNameFromRandomArray);


lettersAndSpace.forEach((letter) => {

    // create empty span
    let emptySpan = document.createElement("span");

    // if the letter is a space add a class to it
    if (letter == " ") {
        emptySpan.className = "with-space";
    }

    lettersGuessContainer.appendChild(emptySpan);
});

// get all spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;
// select the draw-element
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters

document.addEventListener("click", (e) => {
    // set the status 
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        // get clicked letter
        let clickedLetter = e.target.innerHTML;
        // the chosen word
        let theChosenWord = Array.from(randomNameFromRandomArray.toLowerCase())

        theChosenWord.forEach((wordLetter, letterIndex) => {
            // if the clicked letter = any letter of the chosen word
            if (clickedLetter == wordLetter) {

                // change status 
                theStatus = true;
                // loop on guessSpans
                guessSpans.forEach((span, spanIndex) => {
                    if (letterIndex == spanIndex) {
                        span.innerHTML = clickedLetter;
                    }
                })
            }
        })
        // if letter is wrong
        if (theStatus === false) {
            // increase the wrong attpmts one
            wrongAttempts++;
            // add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // play fail sound
            document.getElementById("fail").play();

            // check if user make 8 wrongs
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
            // play success sound
            document.getElementById("success").play();
        }

        // if user complete the right answer
    }

})

function endGame() {
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game is over, the word is ${randomNameFromRandomArray}`)
    div.appendChild(divText);
    div.className = "popUp";
    document.body.appendChild(div);
}