window.onload = () => {
next_button.addEventListener('click', getRandomJoke);
fetchWeather();
sad_feedback.addEventListener('click', () => feedback(1));
neutral_feedback.addEventListener('click', () => feedback(2));
happy_feedback.addEventListener('click', () => feedback(3));
};

// Query de l'espai on es mostra la broma
const joke_display = document.querySelector('#joke_display');
// Query de l'espai on es mostra la icona del clima
const weather_display = document.querySelector('#clima');
// Query de l'espai on es mostra la temperatura
const temp_display = document.querySelector('#temperatura');
// Query dels botons de 'següent broma' i feedback
const next_button = document.querySelector('#next_joke_button');
const sad_feedback = document.querySelector('#sad_feedback');
const neutral_feedback = document.querySelector('#neutral_feedback');
const happy_feedback = document.querySelector('#happy_feedback');

type jokeData = {
    id: string,
    joke: string,
    status: number
}

// Direcció i capçalera de la API de bromes
const JOKE_API_URL = 'https://icanhazdadjoke.com/';
const headers = { headers: {Accept: 'application/json'}};

// Variable per guardar la broma que hi ha en pantalla
let currentJoke: string;
let reportAcudit: ReportAcudit;

// Fetch de l'acudit
async function fetchJoke () {
    console.log(reportAcudits);
    try {
        const response = await fetch(JOKE_API_URL, headers);
        const responseObj: jokeData = await response.json();
        const joke = responseObj.joke;
        currentJoke = joke;
        joke_display.innerHTML = joke;
    } catch (err) {
        alert(err);
    }
}

// Array per guardar la puntuació dels acudits
const reportAcudits: {
    joke: string,
    score: number,
    date: string
}[] = [];

// Enum per les 3 possibles puntuacuions de l'acudit
enum jokeScores {
    sad = 1,
    neutral = 2,
    happy = 3
}

// Classe per crear el report de cada acudit
class ReportAcudit {
    joke: string;
    score: jokeScores;
    date: string;

    constructor(joke: string, score: jokeScores) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
}

// Funció per crear un nou report de l'acudit
function feedback (score: jokeScores) {
    reportAcudit = new ReportAcudit(currentJoke, score);

    if (reportAcudit.joke !== undefined) {
        if (reportAcudits.length === 0) { // Si encara no hi ha cap report, push
            reportAcudits.push(reportAcudit);
        } else if (reportAcudits[0].joke === reportAcudit.joke) { // Si canvia la valoració de la mateixa broma abans de apretar la següent, canviar el report
            reportAcudits[0] = reportAcudit;
        } else { // Si ja hi ha altres reports a l'array, afegir el report al principi
            reportAcudits.unshift(reportAcudit);
        }
    }
}

// Fetch del clima
const CLIMA_API_URL = 'http://api.weatherapi.com/v1/current.json?key=ea1a213aebdc4e8197d135523222305&q=auto:ip'

async function fetchWeather () {
    const response = await fetch(CLIMA_API_URL).then(resp => resp.json());
    weather_display.setAttribute('src', response.current.condition.icon);
    temp_display.innerHTML = `${response.current.temp_c}ºC`;
}

// Fetch Acudits Chuck Norris
const CHUCK_API_URL = 'https://api.chucknorris.io/jokes/random'

async function fetchChuckNorris () {
    const response = await fetch(CHUCK_API_URL).then(resp => resp.json());
    currentJoke = response.value;
    joke_display.innerHTML = response.value;
}

// Get random joke
function getRandomJoke (){
    const random = Math.random();
    if (random > 0.5) {
        fetchChuckNorris()
    } else {
        fetchJoke()
    }
}