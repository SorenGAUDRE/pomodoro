let timer;
let isPaused = true;
let isWork = true;
let isBreak = false;
let workTime = 25; // Durée de la session de travail par défaut (25 minutes)
let breakTime = 5;  // Durée de la session de pause par défaut (5 minutes)
let timeLeft = workTime * 60  ; // Temps de la session de travail en secondes
let initialTimeLeft = timeLeft; // Stocker le temps initial pour les calculs de progression

// Références aux éléments DOM
const progressCircle = document.getElementById('progress-circle'); // Barre de progression circulaire
const circleCircumference = 2 * Math.PI*35; // Circonférence du cercle (rayon de 45)
const timerDisplay = document.getElementById('time'); // Élément d'affichage du temps
if (localStorage.getItem("monTemps") != null){
    workTime = localStorage.getItem("monTemps");
    timeLeft = workTime * 60 
    initialTimeLeft =timeLeft ;
}
if (localStorage.getItem("monTempsPause") != null){
    breakTime = localStorage.getItem("monTempsPause");
}
displayTime(timeLeft)
const startButton = document.getElementById('start'); // Bouton Démarrer
const pauseButton = document.getElementById('pause'); // Bouton Pause
const resetButton = document.getElementById('reset'); // Bouton Réinitialiser
var work = document.getElementById('work'); // Élément étiquette Travail
var breaks = document.getElementById('break'); // Élément étiquette Pause
// Style initial pour l'étiquette de la session de travail
work.style.color="#f1f392"
breaks.style.color="white"


// Définir les valeurs initiales de la barre de progression
progressCircle.style.strokeDasharray = circleCircumference;
progressCircle.style.strokeDashoffset = circleCircumference;

// Fonction pour mettre à jour le cercle de progression en fonction du temps restant
function updateProgress() {
    const progressPercentage = (timeLeft / initialTimeLeft); // Calculer la progression
    const dashoffset = circleCircumference * progressPercentage; // Définir l'offset du tracé
    progressCircle.style.strokeDashoffset = dashoffset; // Mettre à jour la barre de progression
}

// Fonction pour démarrer le minuteur
function startTimer() {
    if (isPaused) {
        if (timeLeft > 0) {
            isPaused = false; // Reprendre le minuteur
            intervalId = setInterval(() => { // Commencer le compte à rebours
                updateProgress(); // Mettre à jour la barre de progression
                displayTime(timeLeft); // Afficher le temps restant
                timeLeft--; // Diminuer le temps de 1 seconde
                
                // Si la session de travail se termine, passer à la session de pause
                if (timeLeft < -1 && isWork == true) {
                    progressCircle.style.strokeDasharray = circleCircumference; // Réinitialiser la progression
                    progressCircle.style.strokeDashoffset = circleCircumference;
                    timeLeft = breakTime * 60 ; // Définir le temps de pause en secondes
                    initialTimeLeft = timeLeft;
                    isWork = false; // Basculer l'état de la session
                    isBreak = true;
                    breaks.style.color="#f1f392"
                    work.style.color="white"
                    displayTime(timeLeft);
                }
                // Si la session de pause se termine, repasser à la session de travail
                else if (timeLeft < -1 && isBreak == true) {
                    progressCircle.style.strokeDasharray = circleCircumference; // Réinitialiser la progression
                    progressCircle.style.strokeDashoffset = circleCircumference;
                    timeLeft = workTime * 60; // Définir le temps de travail en secondes
                    initialTimeLeft = timeLeft;
                    isWork = true;
                    isBreak = false;
                    work.style.color="#f1f392"
                    breaks.style.color="white"
                    displayTime(timeLeft);
                }
            }, 1000); // Mettre à jour toutes les secondes
        }
    } else {
        alert('Le minuteur est déjà en cours'); // Avertir l'utilisateur si le minuteur est déjà démarré
    }
}

// Fonction pour afficher le temps en minutes et secondes
function displayTime(timeLeft) {
    let minutes = parseInt(timeLeft / 60, 10); // Convertir les secondes en minutes
    let seconds = parseInt(timeLeft % 60, 10); // Secondes restantes
    minutes = minutes < 10 ? "0" + minutes : minutes; // Ajouter un zéro si nécessaire
    seconds = seconds < 10 ? "0" + seconds : seconds; // Ajouter un zéro si nécessaire
    timerDisplay.innerText = minutes + ":" + seconds; // Mettre à jour l'affichage du temps
}

// Fonction pour arrêter le minuteur
function stopTimer() {
    clearInterval(intervalId); // Effacer l'intervalle pour arrêter le minuteur
}

// Fonction pour mettre en pause ou reprendre le minuteur
function pauseTimer() {
    if (isPaused) {
        stopTimer(); // Si en pause, arrêter le minuteur
        startTimer(); // Redémarrer le minuteur
    } else {
        stopTimer(); // Si en cours d'exécution, arrêter le minuteur
        isPaused = true; // Mettre le minuteur en pause
    }
}

// Fonction pour réinitialiser le minuteur
function resetTimer() {
    stopTimer(); // Arrêter le minuteur
    console.log(workTime)
    if (localStorage.getItem("monTemps") != null){
        workTime = localStorage.getItem("monTemps");
    }
    if (localStorage.getItem("monTempsPause") != null){
        breakTime = localStorage.getItem("monTempsPause");
    }
    timeLeft = (60 * workTime) ; // Réinitialiser le temps à la durée de travail par défaut
    initialTimeLeft = timeLeft; // Mettre à jour le temps initial
    isPaused = true; // Mettre en pause le minuteur
    isWork = true; 
    isBreak = false; 
    work.style.color="#f1f392"
    breaks.style.color="white"
    displayTime(timeLeft); // Réinitialiser l'affichage du temps
    progressCircle.style.strokeDasharray = circleCircumference; // Réinitialiser la barre de progression
    progressCircle.style.strokeDashoffset = circleCircumference;
}

// Écouteurs d'événements pour les boutons
startButton.addEventListener('click', startTimer); // Bouton Démarrer
pauseButton.addEventListener('click', pauseTimer); // Bouton Pause
resetButton.addEventListener('click', resetTimer); // Bouton Réinitialiser

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
    let workmin= document.getElementById('workmin').value;
    let worksec= document.getElementById('worksec').value;
    let breakmin= document.getElementById('breakmin').value;
    let breaksec= document.getElementById('breaksec').value;
    workTime=parseInt(workmin) + (parseInt(worksec)/60)
    localStorage.setItem('monTemps', workTime)
    breakTime=parseInt(breakmin) + (parseInt(breaksec)/60)
    localStorage.setItem('monTempsPause', breakTime)
    resetTimer();
});
