let countdown;
let timerDisplay = document.getElementById('timerDisplay');
let startButton = document.getElementById('start');
let sonido_acierto = document.getElementById('sonido_acierto');
let sonido_campana = document.getElementById('sonido_campana');
let sonido_reloj = document.getElementById('sonido_reloj');
let timeInput = document.getElementById('timeInput');
let decreaseButton = document.getElementById('decrease');
let increaseButton = document.getElementById('increase');

function showAlert(message) {
    alert(message);
}

function validateInput() {
    let currentTime = parseInt(timeInput.value, 10);
    if (currentTime < 5) {
        showAlert("No puede poner menos de 5 segundos.");
        timeInput.value = 5;
        return false;
    } else if (currentTime > 30) {
        showAlert("No puede poner más de 30 segundos.");
        timeInput.value = 30;
        return false;
    }
    return true;
}

function toggleStartButton() {
    let isValid = validateInput();
    startButton.disabled = !isValid;
}

function updateTimeInput(value) {
    let currentTime = parseInt(timeInput.value, 10);
    currentTime = Math.min(30, Math.max(5, currentTime + value));
    timeInput.value = currentTime;
    toggleStartButton();
}

decreaseButton.addEventListener('click', () => updateTimeInput(-1));
increaseButton.addEventListener('click', () => updateTimeInput(1));

function startTimer() {
    if (!validateInput()) return;
    abrir_bloque_2();

    clearInterval(countdown);
    let time = parseInt(timeInput.value, 10);
    timeInput.disabled = true;
    startButton.disabled = true;
    sonido_reloj.play();
    const now = Date.now();
    const then = now + time * 1000;
    displayTimeLeft(time);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        const millisecondsLeft = then - Date.now();
        
        if (millisecondsLeft <= 5) { // Se detiene el sonido de tik-tak cuando falte medio segundo para acabarse el temporizador.
            sonido_reloj.pause();
            sonido_reloj.currentTime = 0;
        }

        if (secondsLeft < 0) { // Si el temporizador llega a 0:
            clearInterval(countdown);
            sonido_campana.play();
            timeInput.disabled = false;
            toggleStartButton();
            abrir_bloque_3();
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    timerDisplay.textContent = seconds;
}

function resetTimer() {
    clearInterval(countdown);
    let time = parseInt(timeInput.value, 10);
    displayTimeLeft(time);
    sonido_acierto.play();
    sonido_reloj.pause();
    sonido_reloj.currentTime = 0;
    sonido_reloj.play();
    startTimer();
}

startButton.addEventListener('click', startTimer);
//-------------------------------------------------------------------------------------------------
//Funciones para pasar a las siguientes paginas:
function abrir_bloque_2() {
    document.getElementById('bloque_1').style.display = 'none';
    document.getElementById('bloque_2').style.display = 'flex';  
}

function abrir_bloque_3() {
    document.getElementById('bloque_2').style.display = 'none';
    document.getElementById('bloque_3').style.display = 'flex';  
}

function volver_al_menu() {
    document.getElementById('bloque_3').style.display = 'none';
    document.getElementById('bloque_1').style.display = 'flex';
    timeInput.disabled = false;
    startButton.disabled = false;
    toggleStartButton();
}