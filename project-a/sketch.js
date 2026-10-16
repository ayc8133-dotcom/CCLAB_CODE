/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let creatures = [];
let lightSize = 30;
let splitSize = 100;
let maxCreatures = 20

let params = {
  numberOfCurves: 25,
  resolution: 100,
  gap: 1.5,
  weight: 1.5,
  noiseFactor: 30,
  noiseDetail: 0.008,
  speed: 0.005,
  baseColor: 250,
  colorMode: "tints"
};

function setup() {
  createCanvas(800, 500);
  colorMode(HSB, 360, 100, 100, 100);

  // starting creature
  creatures.push(createCreature(width/2, height/2, 80, random(360)));
}

function draw() {
  background(0, 10);

  if(random()<0.3) {
    
    for (let i = 0; i < 100; i++) {

    let x = random(width);
    let y = random(height);

    // Random brightness
    let brightness = random(100, 255);

    fill(255, brightness);
    noStroke();

    // Random star size
    let size = random(1, 4);

    circle(x, y, size);
    }
  }

  for (let i = creatures.length - 1; i >= 0; i--) {
    let c = creatures[i];
    
  let mouseInside =
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height;

  // follows mouse
  if (mouseInside) {
    c.x += (mouseX - c.x) * c.speed;
    c.y += (mouseY - c.y) * c.speed;
  } else {
    let t = frameCount * 0.02;
    // float freely
    let driftX = map(
      noise(c.driftX + t), 0, 1, -1, 1
    );
    let driftY = map(
      noise(c.driftY + t), 0, 1, -1, 1
    );
    c.x += driftX * 2;
    c.y += driftY * 2;
  }

  drawCreature(c);

  // absorbs light
  let d = dist(c.x, c.y, mouseX, mouseY);

  if (
    mouseInside &&
    d < c.size * 0.3 + lightSize/2 &&
    !c.absorbed
  ) {
      c.size += 10;
      c.absorbed = true;
    }

  if (d > c.size + lightSize) {
      c.absorbed = false;
    }

  // split creature
  if (c.size >= splitSize) {
      splitCreature(i);
    }
  }
  
  // light
  noStroke();
  fill(30, 30, 100, 25);
  circle(mouseX, mouseY, 50);
  
  fill(30, 10, 100);
  circle(mouseX, mouseY, lightSize);
}

// creature properties
function createCreature(x, y, size, hue) {
  return {
    x: x,
    y: y,
    size: size,
    hue: hue,
    speed: random(0.008, 0.02),
    driftX: random(1000),
    driftY: random(2000),
    absorbed: false
  };
}

function drawCreature(c) {
  push();
  translate(c.x, c.y);
  drawBody(0, 0, c.size, c.hue, c.x, c.y);
  pop();
}

// DEFINE ADDITIONAL FUNCTIONS HERE
function drawBody(x, y, size, bodyHue, centerX, centerY) {
  push();
  translate(x, y);
  strokeWeight(params.weight);
  noFill();

  for (let j = 1; j <= params.numberOfCurves; j++) {
    beginShape();

    let hue = (bodyHue + j * 3) % 360;
    stroke(hue, 70, 100, 90);

    let curveNoiseFactor = params.noiseFactor + j * 0.5;
    let curveRadius = j * params.gap * (size/80);

  for (let i = 0; i <= params.resolution; i++) {
    let angle = map(i, 0, params.resolution, 0, TWO_PI);
    let px = cos(angle) * curveRadius;
    let py = sin(angle) * curveRadius;

    let n = noise(
      (px + centerX) * params.noiseDetail,
      (py + centerY) * params.noiseDetail,
      frameCount * params.speed
    );

    let offsetX =
      (n - 0.5) * 2 * cos(angle) * curveNoiseFactor;
    let offsetY =
      (n - 0.5) * 2 * sin(angle) * curveNoiseFactor;

      vertex(px + offsetX, py + offsetY);
    }

    endShape(CLOSE);
  }
  pop();
}

// split function
function splitCreature(index) {
  let parent = creatures[index];
  let childSize = parent.size * 0.5;

  if (creatures.length >= maxCreatures) {
    parent.size = splitSize - 1;
    parent.absorbed = true;
    return;
  }

  // child properties
  let child1 = createCreature(
    parent.x - 15,
    parent.y,
    childSize,
    random(360)
  );

  let child2 = createCreature(
    parent.x + 15,
    parent.y,
    childSize,
    random(360)
  );

  // following speed
  child1.speed = random(0.008, 0.018);
  child2.speed = random(0.025, 0.035);

  creatures.splice(index, 1);
  creatures.push(child1, child2);
}

//reset
function keyPressed() {
  if (key === ' ') {
    creatures = [];
    creatures.push(createCreature(width / 2, height / 2, 80, random(360)));
  }
}

