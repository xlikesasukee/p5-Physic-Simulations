const width = 1200;
const height = 1200;

let t = 0;

function setup() {
  createCanvas(width, height);

  //create different waves here:
  //new Wave(xPos,yPos,Color,xPos for Slider)
  wave1 = new Wave(0,400,[245, 236, 66],0);
  wave2 = new Wave(0,600,[66, 245, 200],300);
  wave3 = new Wave(0,800,[66, 156, 245],600);
  wave4 = new Wave(0,1000,[191, 66, 245],900);
}

function draw() {
  background(0);
  push();
  t += 1;
  wave1.show(t);
  wave2.show(t);
  wave3.show(t);
  wave4.show(t);
  pop();
}
