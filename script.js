let timer;
let timeLeft = 0.05 * 60;
let isPaused = true;
let isWork= true;
let isBreak= false;
let initialTimeLeft = timeLeft; // Garde la valeur initiale pour calculer la progression

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
                    timeLeft = 5 * 60 ;
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
                    timeLeft = 25 * 60 ;
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
    timeLeft = 60 * 25
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

