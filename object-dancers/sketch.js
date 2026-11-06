/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);

  // ...except to adjust the dancer's name on the next line:
  dancer = new PeachDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class PeachDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.leafAngle = 0;
    this.size = 1;
    this.pupilY = 0;
    this.bob = 0;
    this.leftLeg = 0;
    this.rightLeg = 0;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.leafAngle = sin(frameCount * 0.05) * 1.5; // leaf swaying
    this.pupilY = sin(frameCount * 0.05) * 10; // pupils moving
    this.bob = sin(frameCount * 0.15) * 10; // body bouncing
    // legs moving
    this.leftLeg = sin(frameCount * 0.15) * 15;
    this.rightLeg = sin(frameCount * 0.15 + PI) * 15;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    translate(0, this.bob);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    scale(this.size); //change size
    noStroke();
    fill(245, 176, 206); //body
    circle(0, 0, 100); 
    // left leg
    fill(235, 21, 60); 
    push();
    translate(-30, 60);
    rotate(radians(this.leftLeg));
    ellipse(0, 0, 40, 30);
    pop();
    // Right leg 
    push();
    translate(30, 60);
    rotate(radians(this.rightLeg));
    ellipse(0, 0, 40, 30);
    pop();
     //eyes
    fill(0);
    ellipse(0 + 20, 0, 30, 50); 
    ellipse(0 - 20, 0, 30, 50);
    fill(255); //pupils
    circle(0 + 20, this.pupilY, 15); 
    circle(0 - 20, this.pupilY, 15);
    //leaf
    push();
    translate(0, -45); 
    rotate(this.leafAngle);
    fill(50, 180, 70);
    beginShape();
    vertex(0, 0);
    bezierVertex(-15, -35);
    bezierVertex(-5, -50); 
    bezierVertex(25, -50);
    vertex(0, 0);
    endShape(CLOSE);
    pop();


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/