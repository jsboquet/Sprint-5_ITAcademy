window.onload = () => {
    next_button.addEventListener('click', fetchJoke);
    sad_feedback.addEventListener('click', () => feedback(1));
    neutral_feedback.addEventListener('click', () => feedback(2));
    happy_feedback.addEventListener('click', () => feedback(3));
};
const joke_display = document.querySelector('#joke_display');
const next_button = document.querySelector('#next_joke_button');
const sad_feedback = document.querySelector('#sad_feedback');
const neutral_feedback = document.querySelector('#neutral_feedback');
const happy_feedback = document.querySelector('#happy_feedback');
const API_URL = 'https://icanhazdadjoke.com/';
const headers = { headers: { Accept: 'application/json' } };
let currentJoke;
let reportAcudit;
async function fetchJoke() {
    console.log(reportAcudits);
    try {
        const response = await fetch(API_URL, headers);
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
