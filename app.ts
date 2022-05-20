window.onload = () => {
next_button.addEventListener('click', fetchJoke)
};

const next_button = document.querySelector('#next_joke_button');

type jokeData = {
    id: string,
    joke: string,
    status: number
}

const API_URL = 'https://icanhazdadjoke.com/';
const headers = { headers: {Accept: 'application/json'}};

async function fetchJoke () {
    const response:jokeData = await fetch(API_URL, headers)
        .then(resp => resp.json())
        .then(data => data.joke)
        .catch(console.error);
    console.log(response);
}