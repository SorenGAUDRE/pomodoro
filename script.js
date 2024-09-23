let timer;
let isPaused = true;
let isWork= true;
let isBreak= false;
let workTime = 25;
let breakTime= 5;
let timeLeft = workTime* 60;
let initialTimeLeft = timeLeft;



const progressCircle = document.getElementById('progress-circle');
const circleCircumference = 2 * Math.PI * 45; // Périmètre du cercle (r = 45)
const timerDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
var work = document.getElementById('work');
var breaks = document.getElementById('break');

work.style.backgroundColor="#4CAF50";
work.style.color="white";
progressCircle.style.strokeDasharray = circleCircumference;
progressCircle.style.strokeDashoffset = circleCircumference;

function updateProgress() {
    const progressPercentage = (timeLeft / initialTimeLeft);
    const dashoffset = circleCircumference * progressPercentage;
    progressCircle.style.strokeDashoffset = dashoffset;
}

function startTimer (){
    if(isPaused){
        if(timeLeft > 0 ){
            isPaused = false
            intervalId = setInterval(() => {
                displayTime(timeLeft);
                updateProgress();
                timeLeft--;
                if (timeLeft<-1 && isWork == true){
                    progressCircle.style.strokeDasharray = circleCircumference;
                    progressCircle.style.strokeDashoffset = circleCircumference;
                    timeLeft = breakTime * 60 ;
                    initialTimeLeft = timeLeft;
                    isWork=false;
                    isBreak=true;
                    breaks.style.backgroundColor="#4CAF50";
                    breaks.style.color="white";
                    work.style.backgroundColor="";
                    work.style.color="black";
                    displayTime(timeLeft);
                }else if (timeLeft<-1 && isBreak == true){
                    progressCircle.style.strokeDasharray = circleCircumference;
                    progressCircle.style.strokeDashoffset = circleCircumference;
                    timeLeft = workTime * 60 ;
                    initialTimeLeft = timeLeft;
                    isWork=true;
                    isBreak=false;
                    work.style.backgroundColor="#4CAF50";
                    work.style.color="white";
                    breaks.style.backgroundColor="";
                    breaks.style.color="black";
                    displayTime(timeLeft);
                }
            }, 1000)
        }
    }
    else{
        alert('le chrono est deja en cours');
    }
}

function displayTime(timeLeft){
    let minutes = parseInt(timeLeft / 60, 10)
    let secondes = parseInt(timeLeft % 60, 10)
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
    timerDisplay.innerText = minutes + ":" + secondes
}


function stopTimer(){
    clearInterval(intervalId);
}

function pauseTimer(){
    if (isPaused){
        stopTimer()
        startTimer();
    }else{
        stopTimer();
        isPaused = true;
    }
}

function resetTimer(){
    stopTimer()
    timeLeft = 60 * workTime
    initialTimeLeft=timeLeft
    isPaused = true
    work.style.backgroundColor="#4CAF50";
    work.style.color="white";
    breaks.style.backgroundColor="";
    breaks.style.color="black";
    displayTime(timeLeft);
    progressCircle.style.strokeDasharray = circleCircumference;
    progressCircle.style.strokeDashoffset = circleCircumference;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    workTime= document.getElementById('timeChanged').value
    breakTime = document.getElementById('breakChanged').value
    startTimer()
    resetTimer()
;})

