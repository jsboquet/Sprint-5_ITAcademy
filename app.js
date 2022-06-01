window.onload = () => {
    next_button.addEventListener('click', getRandomJoke);
    fetchWeather();
    sad_feedback.addEventListener('click', () => feedback(1));
    neutral_feedback.addEventListener('click', () => feedback(2));
    happy_feedback.addEventListener('click', () => feedback(3));
};
const joke_display = document.querySelector('#joke_display');
const weather_display = document.querySelector('#clima');
const temp_display = document.querySelector('#temperatura');
const next_button = document.querySelector('#next_joke_button');
const sad_feedback = document.querySelector('#sad_feedback');
const neutral_feedback = document.querySelector('#neutral_feedback');
const happy_feedback = document.querySelector('#happy_feedback');
const JOKE_API_URL = 'https://icanhazdadjoke.com/';
const headers = { headers: { Accept: 'application/json' } };
let currentJoke;
let reportAcudit;
async function fetchJoke() {
    try {
        const response = await fetch(JOKE_API_URL, headers);
        const responseObj = await response.json();
        const joke = responseObj.joke;
        currentJoke = joke;
        joke_display.innerHTML = joke;
    }
    catch (err) {
        alert(err);
    }
}
const reportAcudits = [];
var jokeScores;
(function (jokeScores) {
    jokeScores[jokeScores["sad"] = 1] = "sad";
    jokeScores[jokeScores["neutral"] = 2] = "neutral";
    jokeScores[jokeScores["happy"] = 3] = "happy";
})(jokeScores || (jokeScores = {}));
class ReportAcudit {
    constructor(joke, score) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
}
function feedback(score) {
    reportAcudit = new ReportAcudit(currentJoke, score);
    if (reportAcudit.joke !== undefined) {
        if (reportAcudits.length === 0) {
            reportAcudits.push(reportAcudit);
        }
        else if (reportAcudits[0].joke === reportAcudit.joke) {
            reportAcudits[0] = reportAcudit;
        }
        else {
            reportAcudits.unshift(reportAcudit);
        }
    }
}
const CLIMA_API_URL = 'http://api.weatherapi.com/v1/current.json?key=ea1a213aebdc4e8197d135523222305&q=auto:ip';
async function fetchWeather() {
    const response = await fetch(CLIMA_API_URL).then(resp => resp.json());
    weather_display.setAttribute('src', response.current.condition.icon);
    temp_display.innerHTML = `${response.current.temp_c}ºC`;
}
const CHUCK_API_URL = 'https://api.chucknorris.io/jokes/random';
async function fetchChuckNorris() {
    const response = await fetch(CHUCK_API_URL).then(resp => resp.json());
    currentJoke = response.value;
    joke_display.innerHTML = response.value;
}
function getRandomJoke() {
    console.log(reportAcudits);
    const random = Math.random();
    if (random > 0.5) {
        fetchChuckNorris();
    }
    else {
        fetchJoke();
    }
    switch_background(bgd_index);
}
const blob_background = document.querySelector('#blob_background');
let bgd_index = 0;
const background_array = ['blob_1.svg', 'blob_2.svg', 'blob_3.svg', 'blob_4.svg', 'blob_5.svg', 'blob_6.svg', 'blob_7.svg', 'blob_8.svg', 'blob_9.svg', 'blob_10.svg'];
function switch_background(index) {
    const src = "media/background_svg/background-changing/";
    let current = src + background_array[index];
    blob_background.setAttribute("src", current);
    bgd_index = bgd_index === (background_array.length - 1) ? 0 : ++bgd_index;
}
