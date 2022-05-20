window.onload = () => {
    next_button.addEventListener('click', fetchJoke);
};
const next_button = document.querySelector('#next_joke_button');
const joke_display = document.querySelector('#joke_display');
const API_URL = 'https://icanhazdadjoke.com/';
const headers = { headers: { Accept: 'application/json' } };
async function fetchJoke() {
    const response = await fetch(API_URL, headers)
        .then(resp => resp.json())
        .then(data => data.joke)
        .catch(console.error);
    joke_display.innerHTML = response.toString();
}
