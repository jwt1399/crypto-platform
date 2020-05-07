// Please like <3 and share if you enjoyed!
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let masterVolume = audioCtx.createGain();
masterVolume.gain.setValueAtTime(0.05, audioCtx.currentTime);
masterVolume.connect(audioCtx.destination);
let freq = 1100;
let type = "square";

let interval = 30;
let long = 400;
let short = 200;
let playing = false;

let handleClick = e => {
  if (!playing) {
    playing = true;
    let morse = morseCode[e.srcElement.innerText];
    let pattern = morseToArray(morse);
    navigator.vibrate(pattern);
    playPattern(pattern);
    let totalTime = pattern.reduce((accumulator, currentValue) => {return accumulator + currentValue;});
    setTimeout(() => {playing = false;}, totalTime);
  };
};

let morseToArray = sequence => {
  let vibrations = [];
  sequence.split("").forEach(n => {
    vibrations.push(n === "·" ? short : long);
    vibrations.push(interval);
  });
  return vibrations;
};

let playPattern = pattern => {
  let oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
  let elapsed = 0;
  pattern.forEach((dur, i) => {
    elapsed += dur / 1000;
    oscillator.frequency.setValueAtTime(
    i % 2 == 0 ? 0 : freq,
    audioCtx.currentTime + elapsed);

  });
  oscillator.connect(masterVolume);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + elapsed);
};

document.querySelectorAll(".letter").forEach(letter => {
  letter.addEventListener("click", handleClick);
});

let morseCode = {
  A: "·−",
  B: "−···",
  C: "−·−·",
  D: "−··",
  E: "·",
  F: "··−·",
  G: "−−·",
  H: "····",
  I: "··",
  J: "·−−−",
  K: "−·−",
  L: "·−··",
  M: "−−",
  N: "−·",
  O: "−−−",
  P: "·−−·",
  Q: "−−·−",
  R: "·−·",
  S: "···",
  T: "−",
  U: "··−",
  V: "···−",
  W: "·−−",
  X: "−··−",
  Y: "−·−−",
  Z: "−−··" };