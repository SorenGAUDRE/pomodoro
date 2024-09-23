let timer;
let isPaused = true;
let isWork = true;
let isBreak = false;
let workTime = 0.05; // Default work session duration (25 minutes)
let breakTime = 5;  // Default break session duration (5 minutes)
let timeLeft = workTime * 60 ; // Work session time in seconds
let initialTimeLeft = timeLeft; // Store initial time for progress calculations

// DOM element references
const progressCircle = document.getElementById('progress-circle'); // Circular progress bar
const circleCircumference = 2 * Math.PI * 45; // Circumference of the circle (with radius 45)
const timerDisplay = document.getElementById('time'); // Time display element
const startButton = document.getElementById('start'); // Start button
const pauseButton = document.getElementById('pause'); // Pause button
const resetButton = document.getElementById('reset'); // Reset button
var work = document.getElementById('work'); // Work label element
var breaks = document.getElementById('break'); // Break label element

// Initial styling for work session label
work.style.color="#f1f392"
breaks.style.color="white"


// Set initial progress bar values
progressCircle.style.strokeDasharray = circleCircumference;
progressCircle.style.strokeDashoffset = circleCircumference;

// Function to update the progress circle based on time left
function updateProgress() {
    const progressPercentage = (timeLeft / initialTimeLeft); // Calculate progress
    const dashoffset = circleCircumference * progressPercentage; // Set the stroke offset
    progressCircle.style.strokeDashoffset = dashoffset; // Update progress bar
}

// Function to start the timer
function startTimer() {
    if (isPaused) {
        if (timeLeft > 0) {
            isPaused = false; // Unpause the timer
            intervalId = setInterval(() => { // Start counting down
                displayTime(timeLeft); // Display the current time
                updateProgress(); // Update progress bar
                timeLeft--; // Decrease time by 1 second
                
                // If work session ends, switch to break session
                if (timeLeft < -1 && isWork == true) {
                    progressCircle.style.strokeDasharray = circleCircumference; // Reset progress
                    progressCircle.style.strokeDashoffset = circleCircumference;
                    timeLeft = breakTime * 60; // Set break time in seconds
                    initialTimeLeft = timeLeft;
                    isWork = false; // Toggle session state
                    isBreak = true;
                    breaks.style.color="#f1f392"
                    work.style.color="white"
                    displayTime(timeLeft);
                }
                // If break session ends, switch back to work session
                else if (timeLeft < -1 && isBreak == true) {
                    progressCircle.style.strokeDasharray = circleCircumference; // Reset progress
                    progressCircle.style.strokeDashoffset = circleCircumference;
                    timeLeft = workTime * 60; // Set work time in seconds
                    initialTimeLeft = timeLeft;
                    isWork = true;
                    isBreak = false;
                    work.style.color="#f1f392"
                    breaks.style.color="white"
                    displayTime(timeLeft);
                }
            }, 1000); // Update every second
        }
    } else {
        alert('The timer is already running'); // Warn the user if they try to start an already running timer
    }
}

// Function to display the time in minutes and seconds
function displayTime(timeLeft) {
    let minutes = parseInt(timeLeft / 60, 10); // Convert seconds to minutes
    let seconds = parseInt(timeLeft % 60, 10); // Remaining seconds
    minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if needed
    seconds = seconds < 10 ? "0" + seconds : seconds; // Add leading zero if needed
    timerDisplay.innerText = minutes + ":" + seconds; // Update the time display
}

// Function to stop the timer
function stopTimer() {
    clearInterval(intervalId); // Clear the interval to stop the timer
}

// Function to pause or resume the timer
function pauseTimer() {
    if (isPaused) {
        stopTimer(); // If paused, stop the timer
        startTimer(); // Restart the timer
    } else {
        stopTimer(); // If running, stop the timer
        isPaused = true; // Set the timer to paused state
    }
}

// Function to reset the timer
function resetTimer() {
    stopTimer(); // Stop the timer
    timeLeft = 60 * workTime ; // Reset time to the default work time
    initialTimeLeft = timeLeft; // Update initial time
    isPaused = true; // Pause the timer
    work.style.color="#f1f392"
    breaks.style.color="white"
    displayTime(timeLeft); // Reset the displayed time
    progressCircle.style.strokeDasharray = circleCircumference; // Reset progress bar
    progressCircle.style.strokeDashoffset = circleCircumference;
}

// Event listeners for the buttons
startButton.addEventListener('click', startTimer); // Start button
pauseButton.addEventListener('click', pauseTimer); // Pause button
resetButton.addEventListener('click', resetTimer); // Reset button

let modal = document.getElementById("myModal");
let btn = document.getElementById("setting");
let span = document.getElementsByClassName("close")[0];

// Lorsque l'utilisateur clique sur le bouton "setting", ouvrir la fenêtre modale
btn.onclick = function() {
    modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur le bouton de fermeture (×), fermer la fenêtre modale
span.onclick = function() {
    modal.style.display = "none";
}

// Lorsque l'utilisateur clique en dehors de la fenêtre modale, fermer la fenêtre modale
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Lorsque le formulaire est soumis, fermer la fenêtre modale
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi réel du formulaire pour démo
    modal.style.display = "none";
    // Vous pouvez ajouter ici du code pour traiter le formulaire si nécessaire
});

// Event listener for form submission to update work/break times
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    workTime = document.getElementById('timeChanged').value; // Update work time
    breakTime = document.getElementById('breakChanged').value; // Update break time
    startTimer(); // Start the timer with new values
    resetTimer(); // Reset the timer to new work/break durations
});
