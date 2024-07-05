let countdown;
let campanaTimeout;
let timerDisplay = document.getElementById('timerDisplay');
let startButton = document.getElementById('start');
let sonido_acierto = document.getElementById('sonido_acierto');
let sonido_campana = document.getElementById('sonido_campana');
let sonido_reloj_8 = document.getElementById('sonido_reloj_8');
let sonido_reloj_10 = document.getElementById('sonido_reloj_10');
let sonido_reloj_12 = document.getElementById('sonido_reloj_12');
let selectedOption = null;

const optionButtons = {
    option8: { button: document.getElementById('option8'), time: 8, sound: sonido_reloj_8 },
    option10: { button: document.getElementById('option10'), time: 10, sound: sonido_reloj_10 },
    option12: { button: document.getElementById('option12'), time: 12, sound: sonido_reloj_12 }
};

function showAlert(message) {
    alert(message);
}

function toggleStartButton() {
    if (selectedOption) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
}

Object.keys(optionButtons).forEach(key => {
    const option = optionButtons[key];
    option.button.addEventListener('click', () => {
        // Deselect previously selected option
        if (selectedOption) {
            selectedOption.button.classList.remove('selected');
        }
        // Select new option
        selectedOption = option;
        selectedOption.button.classList.add('selected');
        toggleStartButton();
    });
});

function startTimer() {
    if (!selectedOption) {
        showAlert("Debe seleccionar una opción.");
        return;
    }
    abrir_bloque_2();

    clearInterval(countdown);
    clearTimeout(campanaTimeout);
    const { time, sound } = selectedOption;
    sound.play();
    startButton.disabled = true;
    const now = Date.now();
    const then = now + time * 1000;
    displayTimeLeft(time);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        const millisecondsLeft = then - Date.now();

        if (millisecondsLeft <= 500) { // Se detiene el sonido de tik-tak cuando falte medio segundo para acabarse el temporizador.
            sound.pause();
            sound.currentTime = 0;
        }

        if (secondsLeft < 0) { // Si el temporizador llega a 0:
            clearInterval(countdown);
            toggleStartButton();
            abrir_bloque_3();
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);

    startCampanaTimer(time);
}

function startCampanaTimer(time) {
    campanaTimeout = setTimeout(() => {
        sonido_campana.play();
    }, time * 1000);
}

function displayTimeLeft(seconds) {
    timerDisplay.textContent = seconds;
}

function resetTimer() {
    clearInterval(countdown);
    clearTimeout(campanaTimeout);
    const { time, sound } = selectedOption;
    displayTimeLeft(time);
    sonido_acierto.play();
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    startTimer();
}

startButton.addEventListener('click', startTimer);

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
    toggleStartButton();
}