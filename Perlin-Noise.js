let corruptionLayer = null;

// List of active moving points for the vines.
let tendrilTips = [];


// color：mold and vine color control
function dotBleed(a)      { return color(0, 0, 0, a); }   
function dotBody(a)       { return color(0, 0, 0, a); }   
function dotCore(a)       { return color(0, 0, 0, a); }   
function tendrilStroke(a) { return color(0, 0, 0, a); }   
function tendrilGlow(a)   { return color(0, 0, 0, a); }   



function drawCorruption() {

  // Create a transparent graphic layer on the first call. Do not use background() to keep it transparent
  if (corruptionLayer === null) {
    corruptionLayer = createGraphics(width, height);
  }

  // Stage 3: Generate only red dots along the borders, growing from small to large
  if (timeState.currentStage === 3) {
    growDiffusion();
  }
  // Stage 4: Generate only vines. Dot generation stops, but existing drawings remain
  if (timeState.currentStage >= 4) {
    growTendrils();
  }

  // Render the persistent layer onto the main canvas
  image(corruptionLayer, 0, 0);
}

// Generate random coordinate centers on the border of each component for dot diffusion
function ensureCorruptionPoints(c) {
  if (c.corruptionPoints) return;

  c.corruptionPoints = [];

  let pointCount = 40;

  for (let i = 0; i < pointCount; i++) {
    let p = randomBorderPoint(c);

    c.corruptionPoints.push({
      rx: p.x - c.x,
      ry: p.y - c.y
    });
  }
}

