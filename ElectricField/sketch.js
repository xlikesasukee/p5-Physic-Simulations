const circleDiameter = 50;
const circleRadius = circleDiameter / 2;

const rectangleSizeX = circleDiameter * (3/6);
const rectangleSizeY = circleDiameter * (1/8);

//let orangeColor = color(252, 164, 10)
//let redColor = color(214, 26, 26)
//let whiteColor = color(255, 232, 232)
//let backgroundColor = color(0, 0, 0)
//let blueColor = color(84, 116, 214)

var createdParticles = [new Particle(new Complex(600,600),1.602176e-19)];
var electricFieldShown;

//const k is 4*pi*e0 or 9*10^9
const k = 9*(Math.pow(10,9));

function setup() {
  createCanvas(1200, 1200);
}

function draw() {
  background(0);
  textSize(32);
  fill(0);
  text("Drücke q um ein Proton zu malen\nDrücke w um ein Elektron zu malen\nDrücke 'e' um das elektrische Feld anzuzeigen!", 100,100);

  //go through all created elements and draw them
  createdParticles.forEach(element => {
    element.draw();
  });

  if(electricFieldShown){
    drawElectricField();
  }
}


function keyPressed(){
  //if "q" key is pressed, create a Proton
  //if "w" key is pressed, create an Electron
  //if "e" key is pressed, calculate and draw electric field
  //if "r" key is pressed, remove the last created Particle
  if(key === "q"){
    let proton = new Particle(new Complex(mouseX, mouseY),1.602176e-19);

    createdParticles.push(proton);
  }else if(key === "w"){
    let electron = new Particle(new Complex(mouseX, mouseY),-1.602176e-19);

    createdParticles.push(electron);
  }else if(key === "e"){
    if(electricFieldShown === true){
      electricFieldShown = false;
    }else{
      electricFieldShown = true;
    }
  }else if(key === "r"){
    createdParticles.pop()
  }
}

function drawElectricField() {
  //find coordinate for each arrow
  for (let x = 0; x < 1200; x += 40) {
    for (let y = 0; y < 1200; y += 40) {
      let base = new Complex(x, y);
      //calculate E of base and multiply with charge of arrow
      let F = calculateElectricFieldVector(base).mul(1e15);
      //get normalized value of F
      let absF = F.abs();
      F = F.mul(1/absF);
      drawArrow(base, new Complex(base.re + F.re, base.im + F.im),[35, 144, 145]);
    }
  }
}

function calculateElectricFieldVector(arrowPos){
  let sum = new Complex(0,0); //initialize sum first
  createdParticles.forEach(element => {
    //calculate E(r). This is the formula to calculate the strength of the electric field
    let elementPos = element.pos;
    let distance = arrowPos.sub(elementPos);
    let absDistance = distance.abs();
    let normalizedDistance = distance.div(absDistance); 
    
    let E = normalizedDistance.mul(element.charge/ (absDistance * absDistance));
    //add all electric fields together to get the final strength of the electric field at the given position
    sum = sum.add(E);
  });
  sum = sum.div(k);
  return sum;
}

//draw an arrow from base to pvector with the given color
function drawArrow(base, pvector, color){
  push();

  let triangleSize = 10;
  let circleRadius = 5;
  let arrowlenght = 40;

  translate(base.re, base.im);
  /*create a vector from given complex numbers and normalize them*/
  let vector = createVector(pvector.re -base.re, pvector.im -base.im);
  vector.normalize();
  fill(color[0],color[1],color[2]);
  //draw a circle at start
  circle(0,0,circleRadius);
  //draw a line to end
  stroke(color[0],color[1],color[2])
  line(0, 0, vector.x * arrowlenght, vector.y * arrowlenght);
  //rotate in direction of the vector
  rotate(vector.heading());
  /*get the length of the vector with vector.mag() and subtract
  by triangleSize to later draw a triangle on top and not go over
  wanted arrow length*/
  translate(vector.mag() * 40 - triangleSize, 0);
  triangle(0, triangleSize / 2, 0, -triangleSize / 2, triangleSize, 0);
  
  pop();
}


