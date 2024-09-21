let timer;
let timeLeft = 25 * 60;
let isPaused = true;

const timerDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function startTimer (){
    if(isPaused){
        if(timeLeft > 0 ){
            isPaused = false
            setInterval(() => {
                timerDisplay.innerHTML =  timeLeft.toString();
                timeLeft--;
            }, 1000)
        }else{
            timeLeft = 25 * 60 ;
            alert('temps reset')
        }
    }
    else{
        alert('le chrono est deja en cours')
    }
}

function pauseTimer(){
    if (isPaused){
        startTimer();
    }else{
        isPaused = true;
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

