let timer;
let timeLeft = 0.03 * 60;
let isPaused = true;
let isWork= true;
let isBreak= false;

const timerDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
var work = document.getElementById('work');
var breaks = document.getElementById('break');

work.style.backgroundColor="#4CAF50";

function startTimer (){
    if(isPaused){
        if(timeLeft > 0 ){
            isPaused = false
            intervalId = setInterval(() => {
                let minutes = parseInt(timeLeft / 60, 10)
                let secondes = parseInt(timeLeft % 60, 10)
                minutes = minutes < 10 ? "0" + minutes : minutes
                secondes = secondes < 10 ? "0" + secondes : secondes
                timerDisplay.innerText = minutes + ":" + secondes
                timeLeft--;
                if (timeLeft<=0 && isWork == true){
                    timeLeft = 5 * 60 ;
                    isWork=false;
                    isBreak=true;
                    breaks.style.backgroundColor="#4CAF50";
                    work.style.backgroundColor="";
                    alert('passage en pause')
                }else if (timeLeft<=0 && isBreak == true){
                    timeLeft = 25 * 60 ;
                    isWork= true;
                    isBreak=false;
                    work.style.backgroundColor="#4CAF50";
                    breaks.style.backgroundColor="";
                    alert('passage au travail')
                }
            }, 1000)
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
    work.style.backgroundColor="#4CAF50";
    breaks.style.backgroundColor="";
    let minutes = parseInt(timeLeft / 60, 10)
    let secondes = parseInt(timeLeft % 60, 10)
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes
    timerDisplay.innerText = minutes + ":" + secondes

}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

