function setup() {
  createCanvas(windowWidth, windowHeight);
}

//Draw a kettleball weight icon
function draw() {
  //move the origin to the center of the canvas
  translate(width / 2, height / 2);
  //draw the weight
  drawWeight();
} 

//draw a kettleball weight
function drawWeight() {
  //draw the weight
  stroke(0);
  strokeWeight(1);
  fill(0);
  ellipse(0, 0, 150, 150);
  //draw the handle
  stroke(0);
  strokeWeight(1);
  fill(0);
  ellipse(-75, 0, 50, 50);
  //draw the weight
  stroke(0);
  strokeWeight(1);
  fill(0);
  ellipse(0, 0, 100, 100);
}

// Path: assets\img\weight.js
// Compare this snippet from assets\img\portfolio\coffee.js:
// /*create a transparent canvas*/
// function setup() {
//   createCanvas(400, 400);
//   //transparent background
//   background(0, 0, 0, 0);
// }

