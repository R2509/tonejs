//import { Tone } from "tone/build/esm/core/Tone";
//import * as Tone from 'tone'

const playButton = document.getElementById('play');
const C3Button = document.querySelector('button.key#C3');
async function start() {
    await Tone.start();
    run();
}
function run() {
    let octave = 3
    const keys = {
        a: ['C', 0],
        s: ['D', 0],
        d: ['E', 0],
        f: ['F', 0],
        g: ['G', 0],
        h: ['A', 0],
        j: ['B', 0],
        k: ['C', 1],
        l: ['D', 1],
    }
    function k(key) {
        if (keys.hasOwnProperty(key)) {
            return keys[key][0] + (keys[key][1] + octave).toString();
        } else {
            if (key == '-') octave--;
            if (key == '=') octave++;
        }
    }
    let running = []
    const sampler = new Tone.Sampler({
            urls: {
                A1: "A1.mp3",
                A2: "A2.mp3",
        },
            baseUrl: "https://tonejs.github.io/audio/casio/",
    }).toDestination();
    const now = Tone.now();
    function keydown(event) {
        let key = k(event.key)
        console.log(key)
        if (running.indexOf(key) >= 0) {return;}
        sampler.triggerAttack(key);
        running.push(key);
        console.log(running)
    }
    function keyup(event) {
        let key = k(event.key)
        sampler.triggerRelease(key);
        running = running.filter(e => e !== key)
        console.log(running)
    }
    window.onkeydown = keydown
    window.onkeyup = keyup
}

playButton.addEventListener('click', start);