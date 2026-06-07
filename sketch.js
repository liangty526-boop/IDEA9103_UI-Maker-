let currentStage = 1;   
let elapsedMs = 0;      
let placedComponents = [];

const STAGE_DURATION_MS = 60000; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  placedComponents.push({ x: 250, y: 200, w: 600, h: 80, text: "I AM A VERY LONG TESTING TEXT" });
}

function draw() {
  background(220);
  updateTime();

  for (let c of placedComponents) {
    push();
    rectMode(CORNER);
    noStroke(); fill(245);
    rect(c.x, c.y, c.w, c.h, 8);
    noFill(); stroke(200);
    rect(c.x, c.y, c.w, c.h, 8);
    noStroke(); fill(60);
    textAlign(LEFT, CENTER); textSize(18);
    text(c.text, c.x + 16, c.y + c.h / 2);
    pop();
  }

  drawDebugHUD();
}

function updateTime() {
  elapsedMs = millis(); 
  currentStage = constrain(floor(elapsedMs / STAGE_DURATION_MS) + 1, 1, 4);
}

function drawDebugHUD() {
  push(); resetMatrix();
  noStroke(); fill(0, 180);
  rect(0, 0, 230, 72);
  fill(255); textAlign(LEFT, TOP); textSize(14);
  text('Stage: ' + currentStage, 12, 10);
  text('Time: ' + (elapsedMs / 1000).toFixed(1) + ' s', 12, 32);
  text('Components: ' + placedComponents.length, 12, 52);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

