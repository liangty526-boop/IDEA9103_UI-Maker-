let outerSegments;
let panelSegments;
let workspaceSegments;
let missionSegments;
let bgmSegments;

let paletteComponents = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  createInterfaceSegments();
  createPaletteComponents();
}

function draw() {
  background(245);

  drawInterface();
  drawPaletteComponents();
}

function createInterfaceSegments() {
  let roughnessLarge = 0.8;
  let roughnessSmall = 1.2;

  outerSegments = createSketchRect(
    width * 0.02,
    height * 0.03,
    width * 0.96,
    height * 0.95,
    width * 0.025,
    roughnessLarge
  );

  panelSegments = createSketchRect(
    width * 0.035,
    height * 0.055,
    width * 0.16,
    height * 0.89,
    width * 0.02,
    roughnessSmall
  );

  workspaceSegments = createSketchRect(
    width * 0.25,
    height * 0.19,
    width * 0.63,
    height * 0.75,
    width * 0.025,
    roughnessSmall
  );

  missionSegments = createSketchRect(
    width * 0.28,
    height * 0.06,
    width * 0.30,
    height * 0.12,
    width * 0.018,
    roughnessSmall
  );

  bgmSegments = createSketchRect(
    width * 0.64,
    height * 0.075,
    width * 0.18,
    height * 0.055,
    width * 0.015,
    roughnessSmall
  );
}

function createPaletteComponents() {
  paletteComponents = [];

  let panelX = width * 0.035;
  let panelY = height * 0.055;
  let panelW = width * 0.16;

  let componentX = panelX + panelW * 0.15;
  let componentW = panelW * 0.7;

  let currentY = panelY + height * 0.12;
  let gap = height * 0.025;

  let backgroundH = height * 0.06;
  let imageW = componentW * 0.55;
  let imageH = height * 0.14;
  let searchH = height * 0.04;
  let titleH = height * 0.035;
  let textH = height * 0.06;
  let cardW = componentW * 0.9;
  let cardH = height * 0.25;

  paletteComponents.push(
    new Component(
      componentX,
      currentY,
      componentW,
      backgroundH,
      "backgroundImage",
      "background"
    )
  );

  currentY += backgroundH + gap;

  paletteComponents.push(
    new Component(
      componentX + panelW * 0.15,
      currentY,
      imageW,
      imageH,
      "image",
      "image"
    )
  );

  currentY += imageH + gap;

  paletteComponents.push(
    new Component(
      componentX,
      currentY,
      componentW,
      searchH,
      "search",
      "search"
    )
  );

  currentY += searchH + gap;

  paletteComponents.push(
    new Component(
      componentX,
      currentY,
      componentW,
      titleH,
      "title",
      "title"
    )
  );

  currentY += titleH + gap;

  paletteComponents.push(
    new Component(
      componentX,
      currentY,
      componentW,
      textH,
      "text",
      "text"
    )
  );

  currentY += textH + gap;

  paletteComponents.push(
    new Component(
      componentX + panelX * 0.15,
      currentY,
      cardW,
      cardH,
      "card",
      "card"
    )
  );
}

function drawPaletteComponents() {
  for (let component of paletteComponents) {
    component.display();
  }
}

function drawInterface() {
  // grey background area
  noStroke();
  fill(190);
  rect(width * 0.02, height * 0.03, width * 0.96, height * 0.95);

  // white panel and workspace fills
  fill(250);
  rect(width * 0.035, height * 0.055, width * 0.16, height * 0.89);

  fill(255);
  rect(width * 0.25, height * 0.19, width * 0.63, height * 0.75);

  // draw sketch borders
  stroke(70);
  strokeWeight(3);
  drawSegments(outerSegments);
  drawSegments(panelSegments);
  drawSegments(workspaceSegments);
  drawSegments(missionSegments);
  drawSegments(bgmSegments);

  // Components text
  noStroke();
  fill(70);
  textAlign(LEFT, CENTER);
  textSize(width * 0.02);
  text("Components", width * 0.045, height * 0.09);

  // Mission text
  textAlign(CENTER, CENTER);
  textSize(width * 0.015);
  text("Design a website for our 美术馆~", width * 0.43, height * 0.12);

  // little museum-guide figure
  stroke(70);
  strokeWeight(3);
  noFill();
  ellipse(width * 0.25, height * 0.08, width * 0.025, width * 0.018);
  line(width * 0.25, height * 0.095, width * 0.235, height * 0.18);
  line(width * 0.25, height * 0.095, width * 0.265, height * 0.18);
  line(width * 0.235, height * 0.18, width * 0.265, height * 0.18);

  // BGM selector text
  noStroke();
  fill(70);
  textAlign(LEFT, CENTER);
  textSize(width * 0.018);
  text("bgm", width * 0.655, height * 0.103);

  // dropdown arrow
  stroke(70);
  strokeWeight(3);
  line(width * 0.80, height * 0.095, width * 0.805, height * 0.105);
  line(width * 0.81, height * 0.095, width * 0.805, height * 0.105);

  // refresh button
  noFill();
  stroke(70);
  strokeWeight(3);
  drawSketchCircle(width * 0.875, height * 0.10, width * 0.0275, 2, 10);

  // trash button
  drawSketchCircle(width * 0.94, height * 0.10, width * 0.0275, 2, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createInterfaceSegments();
  createPaletteComponents();
}