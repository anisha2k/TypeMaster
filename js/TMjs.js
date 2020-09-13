//function to chage to light or dark mode accordingly
document.addEventListener('DOMContentLoaded', () => {
  const themeStylesheet = document.getElementById('theme');
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
      // if it's light -> go dark
      if(themeStylesheet.href.includes('light')){
          themeStylesheet.href='css/dark-theme.css';
          themeToggle.innerText = 'Switch to light mode';
      } else {
          // if it's dark -> go light
          themeStylesheet.href='css/light-theme.css';
          themeToggle.innerText = 'Switch to dark mode';

      }
  })
})

// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
  "Push yourself, because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do.",
];

//promt to take the difficulty level
function selectDifficulty() {
  var level = window.prompt("Select level: easy, meduim, difficult");
  console.log(level);
  
  //switch case to display the quotes according to difficulty level selected
  switch (level) {
    case "easy":
        quotes_array = [
        "the earth goes around the sun.",
        "i like coffee.",
        "mary likes tea.",
        "i have a pet dog.",
        "she is my best friend.",
        "i love my family.",
        "my best friend is sarah.",
        "i love my family.",
        "do not forget to wear a mask.",
        "love yourself.",
        "eat lots of ice cream.",
        "carpe diem.",
        "stay hydrated!"
      ];
      break;

    case "medium":
      quotes_array = [
        "The quick brown fox jumps over the lazy dog.",
        "My favourite televison show is Masterchef Austraila.",
        "I always fail to wake up on time and as a result I am always late too lass.",
        "Corona virus has resulted in the worsening of our country's econnomy.",
        "Always be focused and never loose hope.",
        "Dream big and never settle for anything less.",
      ];
      break;

    case "difficult":
      quotes_array = [
        "When do you think they will get back from their adventure in Cairo, Egypt?",
        "Hector quizzed Mr. Vexife for two hours, but he was unable to get any information.",
        "Please take your dog, Cali, out for a walk – he really needs some exercise!",
        "What a beautiful day it is on the beach, here in beautiful and sunny Hawaii.",
        " Trixie and Veronica, our two cats, just love to play with their pink ball of yarn.",
        "Rex Quinfrey, a renowned scientist, created plans for an invisibility machine.",
      ];
      break;

    case "default":
      quotes_array = [
        "default",
        "Push yourself, because no one else is going to do it for you.",
        "Failure is the condiment that gives success its flavor.",
        "Wake up with determination. Go to bed with satisfaction.",
        "It's going to be hard, but hard does not mean impossible.",
        "Learning never exhausts the mind.",
        "The only way to do great work is to love what you do.",
      ];
      break;
  }
  console.log(quotes_array);
}

//funtion for reset button
function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = "Click on the area below to start the game.";
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

//function for stop button
function stopValues() {
  clearInterval(timer);
  timeLeft = TIME_LIMIT - timeElapsed;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  timer_text.textContent = timeLeft + "s";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

//function for start button
function setValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = "Click on the area below to start the game.";
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

// selecting required elements
var timer_text = document.getElementById("curr_time");
var accuracy_text = document.getElementById("curr_accuracy");
var error_text = document.getElementById("curr_errors");
var cpm_text = document.getElementById("curr_cpm");
var wpm_text = document.getElementById("curr_wpm");
var quote_text = document.getElementById("quote");
var input_area = document.getElementById("input_area");
var restart_btn = document.getElementById("restart_btn");
var start_btn = document.getElementById("start_btn");
var stop_btn = document.getElementById("stop_btn");
var cpm_group = document.getElementById("cpm");
var wpm_group = document.getElementById("wpm");
var error_group = document.getElementById("errors");
var accuracy_group = document.getElementById("accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  // separate each character and make an element
  // out of each of them to individually style them
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });

  // roll over to the first quote
  if (quoteNo < quotes_array.length - 1) quoteNo++;
  else quoteNo = 0;
}

function processCurrentText() {
  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split("");

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    // character not currently typed
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");

      // correct character
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");

      // incorrect character
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function startGame() {
  resetValues();
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  } else {
    // finish the game
    finishGame();
  }
}
function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on Restart to start a new game.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}
