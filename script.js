// DECLARING DOM ELEMENTS
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
const indicator = document.querySelector(".status-indicator");
const pomodoroCount = document.querySelector(".counter")

// INITIAL SETUP
pauseAlert.style.display = "none";
window.paused= false;
window.session = false;
let sessionValStored;
let minutes = 25;
let seconds = 0;
let sessionFinished = 0;
sessionDisplay.textContent = minutes + ":" + "0" +parseInt(seconds ,10);
pomodoroCount.textContent = sessionFinished + "/10"
sessionValue.textContent = 25;
breakValue.textContent = 5;
let myInterval;

function startTimer(duration, sessionDisplay) {
  let timer = duration, minutes, seconds;
  myInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      sessionDisplay.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        if(session){
          timer = duration;
          window.session = false;
          indicator.textContent = "Session";
        }
        else{
          timer = 60 * breakValue.textContent; 
          window.session = true;
          indicator.textContent = "Break";
          sessionFinished++;
          pomodoroCount.textContent = sessionFinished + "/10"
          if(sessionFinished === 10){
            stopFunc();
            sessionDisplay.textContent = "END!"
          }
        }

      }
  }, 1000);
  return myInterval;
}
sessionUp.addEventListener("click", function(e){
  if(sessionDisplay.classList.contains("active")){
    return;
  }
  if(sessionFinished === 10){
    return;
  }
  
  sessionValue.textContent++;
  minutes = sessionValue.textContent;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  sessionDisplay.textContent = minutes + ":" + "0"+seconds;
});

sessionDown.addEventListener("click", function(e){
  if(sessionValue.textContent == 1 || sessionDisplay.classList.contains("active")){
    return;
  }
  if(sessionFinished === 10){
    return;
  }

  sessionValue.textContent--;
  minutes = sessionValue.textContent;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  sessionDisplay.textContent = minutes + ":" + "0"+seconds;
});

breakUp.addEventListener("click", function(e){
  if(sessionDisplay.classList.contains("active")){
    return;
  }
  if(sessionFinished === 10){
    return;
  }
  
  breakValue.textContent++;
});

breakDown.addEventListener("click", function(e){
  if(breakValue.textContent == 1 || sessionDisplay.classList.contains("active")){
    return;
  }
  if(sessionFinished === 10){
    return;
  }

  breakValue.textContent--;
});

startButton.addEventListener("click", function(e){
  if(sessionDisplay.classList.contains("active") && paused == false){
    return;
  }
  if(sessionDisplay.classList.contains("active" && paused == "true")){
    setTimer();
    return;
  }
  if(sessionFinished === 10){
    return;
  }
  setTimer();
  sessionDisplay.classList.add("active");
});

refreshButton.addEventListener("click", function(e){
  refreshFunc();
});

pauseButton.addEventListener("click", function(e){
  pauseFunc(); 
});

stopButton.addEventListener("click", function(e){
  stopFunc();
});

function setTimer() {
  if(paused){
    let t = sessionValStored.split(':');
    let sessionDuration = 60 * parseInt(t[0], 10) + parseInt(t[1], 10);
    startTimer(sessionDuration, sessionDisplay);
    window.paused=false;
    pauseAlert.style.display = "none";
    return;
  }
 
  sVal = sessionValue.textContent;
  let sessionDuration = 60 * sVal;
  startTimer(sessionDuration, sessionDisplay);
};

function refreshFunc() {
  clearInterval(myInterval);
  window.paused=false
  sessionDisplay.classList.remove("active");
  pauseAlert.style.display = "none";
  indicator.textContent = "Session";
  sessionValue.textContent = 25;
  breakValue.textContent = 5;
  sessionFinished = 0;
  pomodoroCount.textContent = sessionFinished + "/10"
  minutes = 25;
  seconds = 0;
  sessionDisplay.textContent = minutes + ":" + "0" +parseInt(seconds ,10);
}

function pauseFunc() {
  if(sessionDisplay.classList.contains("active")){
    window.paused=true;
    pauseAlert.style.display = "block";
    sessionValStored = sessionDisplay.textContent;
    clearInterval(myInterval);
    myInterval = null;
  }
}

function stopFunc() {
  clearInterval(myInterval);
  window.paused=false
  sessionDisplay.classList.remove("active");
  indicator.textContent = "Session";
  pauseAlert.style.display = "none";
  minutes = sessionValue.textContent;
  seconds = 0;
  sessionDisplay.textContent = minutes + ":" + "0" +parseInt(seconds ,10);
  if(sessionFinished === 10){
    sessionDisplay.textContent = "END!"
  }
}

