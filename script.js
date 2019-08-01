const sessionValue = document.querySelector(".session-value");
const sessionUp = document.querySelector(".session-up");
const sessionDown = document.querySelector(".session-down");

const breakValue = document.querySelector(".break-value");
const breakUp = document.querySelector(".break-up");
const breakDown = document.querySelector(".break-down");

const startButton = document.querySelector(".play");
const refreshButton = document.querySelector(".refresh");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");

const sessionDisplay = document.querySelector('#timer');
const pauseAlert = document.querySelector(".pause-alert");

pauseAlert.style.display = "none";

sessionValue.textContent = 25;
breakValue.textContent = 5;


sessionUp.addEventListener("click", function(e){
  if(sessionDisplay.classList.contains("active")){
    return;
  }
  sessionValue.textContent++;
  minutes = sessionValue.textContent;
  sessionDisplay.textContent = minutes + ":" + "0"+seconds;
});

sessionDown.addEventListener("click", function(e){
  if(sessionValue.textContent == 1 || sessionDisplay.classList.contains("active")){
    return;
  }
  sessionValue.textContent--;
  minutes = sessionValue.textContent;
  sessionDisplay.textContent = minutes + ":" + "0"+seconds;
});

breakUp.addEventListener("click", function(e){
  if(sessionDisplay.classList.contains("active")){
    return;
  }
  breakValue.textContent++;
});

breakDown.addEventListener("click", function(e){
  if(breakValue.textContent == 1 || sessionDisplay.classList.contains("active")){
    return;
  }
  breakValue.textContent--;
});

