const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input")
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off!! ${correctWord.toUpperCase()} was the correct word`);
        initGame(); //calling initGame function, so that the game
    }, 1000);
}

const initGame = () => {
    initTimer(30); // calling initTimer function with passing 30 as maxTime value
      let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");//splitting each letter of random word
    for(let i=wordArray.length - 1; i > 0 ; i--)
    {
        let j=Math.floor(Math.random() * (i+1));//getting the random number.
        //shuffling and splitting wordArray letters randomly
        [wordArray[i],wordArray[j]]=[wordArray[j],wordArray[i]];
    }
    wordText.innerText = wordArray.join("");   // passing the word as word text
    hintText.innerText = randomObj.hint; // passing random object hint as the hint text
    correctWord = randomObj.word.toLocaleLowerCase(); //passing random word to correctWord
    inputField.value = ""; // making input field empty
    inputField.setAttribute("maxlength", correctWord.length); // setting input maxlength attr value to word length
    // console.log(randomObj);
}
//The word are splited as the scrimble of the words 
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase(); // Getting the user word
    if(!userWord) return alert("Please enter the word to check"); // if user didn't enter anything.
    // If user word doesn't match the correct word.
    if(userWord !== correctWord) return alert(`Opps! ${userWord} is not a correct word`);
    // If user entered word matches the correct word.
    alert(`Congrats! ${userWord} is the correct word`);
    initGame();
}


refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);