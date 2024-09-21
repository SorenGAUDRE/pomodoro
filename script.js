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
            intervalId = setInterval(() => {
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
    isPaused = true
    timerDisplay.innerHTML =  timeLeft.toString()

}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

