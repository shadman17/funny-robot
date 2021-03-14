const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Paasing Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: '04bbf30e215d4e1198238244681f6a72',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const response = await fetch(apiURL)
        const data = await response.json();
        if (data.setup && data.delivery) {
            joke = `${data.setup} ... ${data.delivery}`
        }
        else {
            joke = data.joke;
        }
        console.log(joke);
    } catch (e) {
        joke = `Sorry I can't tell you a joke right now.`
    }
    tellMe(joke);
    toggleButton();

}

//
function toggleButton(){
    button.disabled = !button.disabled;
}

//Event Listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
