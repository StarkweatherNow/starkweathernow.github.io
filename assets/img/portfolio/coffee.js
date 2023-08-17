/*create a transparent canvas*/
function setup() {
  createCanvas(400, 400);
  //transparent background
  background(0, 0, 0, 0);
}

/*draw a circle*/
function draw() {
  //move the origin to the center of the canvas
  translate(width / 2, height / 2);
  //draw the circle with a thick orange outline and light brown fill
  stroke(255, 165, 0);
  strokeWeight(10);
  fill(222, 184, 135);
  ellipse(0, 0, 300, 300);
  //draw the coffee
  drawCoffee();
}

/*draw an isometric white coffee cup*/
function drawCoffee() {
  //draw the cup
  stroke(255);
  strokeWeight(1);
  fill(255);
  ellipse(0, 0, 150, 150);
  //draw the handle
  stroke(255);
  strokeWeight(1);
  fill(255);
  ellipse(-75, 0, 50, 50);
  //draw the coffee
  stroke(0);
  strokeWeight(1);
  fill(0);
  ellipse(0, 0, 100, 100);

}
