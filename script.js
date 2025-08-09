
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

function populateVoices(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
    .filter(voice =>{
     const languages = ['hi-IN', 'en-IN', 'en-US'];
    return languages.some(lang => voice.lang.includes(lang));
    }
    .map(voice => `<option value "${voices.name}">${voice.name} (${voice.lang})</option`)
    .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true){
msg.text = document.querySelector('[name="text"]').value;
    speechSynthesis.cancel();
    if(startOver){
        speechSynthesis.speak(msg);
    }
}

function setOption(){
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged',populateVoices)
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('chnage', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false))



