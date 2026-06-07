let song = [];
let fft;
let corruption = 1;
let smoothBass = 0, smoothMid = 0, smoothTreble = 0;

let testComp = { x: 250, y: 200, w: 600, h: 80, text: "I AM A VERY LONG TESTING TEXT" };

let playButton;
let currentSongIndex = 0;
let songSettings = [
  { bassMin: 125, midMin: 75, trebleMin: 0, bassMax: 255, midMax: 255, trebleMax: 255, bassRange: 1, midRange: 0.4, trebleRange: 6 },
  { bassMin: 125, midMin: 75, trebleMin: 0, bassMax: 255, midMax: 255, trebleMax: 255, bassRange: 1, midRange: 0.4, trebleRange: 6 },
  { bassMin: 125, midMin: 75, trebleMin: 0, bassMax: 255, midMax: 255, trebleMax: 255, bassRange: 1, midRange: 0.4, trebleRange: 6 },
  { bassMin: 125, midMin: 75, trebleMin: 0, bassMax: 255, midMax: 255, trebleMax: 255, bassRange: 1, midRange: 0.4, trebleRange: 6 },
];

let currentSettings = songSettings[0];

function preload() {
  song[0] = loadSound("Assets/songs/sample4.mp3");
  song[1] = loadSound("Assets/songs/sample8.mp3");
  song[2] = loadSound("Assets/songs/sample10.mp3");
  song[3] = loadSound("Assets/songs/bonus1.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  fft = new p5.FFT(0.8, 1024);
  fft.setInput(song[0]);

  playButton = createButton('Play');
  playButton.position(20, 20);
  playButton.mousePressed(bgmPlay);


  // testing buttons
  let btn1 = createButton('歌1');
  btn1.position(80, 20);
  btn1.mousePressed(() => switchBGM(0));
  
  let btn2 = createButton('歌2');
  btn2.position(130, 20);
  btn2.mousePressed(() => switchBGM(1));
  
  let btn3 = createButton('歌3');
  btn3.position(180, 20);
  btn3.mousePressed(() => switchBGM(2));
}

function bgmPlay() {
  if (!song[0].isPlaying()) {
    song[0].loop();
    playButton.html('Pause');
  } else {
    song[0].pause();
    playButton.html('Play');
  }
}

function draw() {
  background(0);

  fft.analyze();
  let bass = fft.getEnergy(60, 150);
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  smoothBass = lerp(smoothBass, bass, 0.8);
  smoothMid = lerp(smoothMid, mid, 0.6);
  smoothTreble = lerp(smoothTreble, treble, 0.2);

  glitchComponent(testComp);

  fill(120);
  textAlign(LEFT, TOP);
  textSize(13);
  text(
    "bass: " + smoothBass.toFixed(0) +
    "   mid: " + smoothMid.toFixed(0) +
    "   treble: " + smoothTreble.toFixed(0) +
    "     corruption: " + corruption,
    20, 60
  );
  textAlign(CENTER, CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function switchBGM(index) {
  // pause before switching
  if (song[currentSongIndex] && song[currentSongIndex].isPlaying()) {
    song[currentSongIndex].stop();
  }
  
  currentSongIndex = index;            // change index
  fft.setInput(song[index]);           // analysize new song
  song[index].loop();                  // play new song
  
  playButton.html('Pause');
}
