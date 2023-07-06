/*
 Title: Electric field
 
 Author: Darian Patz
*/


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

//const k bestehend aus 4*pi*e0
const k = 9*(Math.pow(10,9));

function setup() {
  createCanvas(1200, 1200);
}

function draw() {
  background(0);
  textSize(32);
  fill(0);
  text("Drücke q um ein Proton zu malen\nDrücke w um ein Elektron zu malen\nDrücke 'e' um das elektrische Feld anzuzeigen!", 100,100);

  //gehe durch alle erstellten elemente und male sie auf
  createdParticles.forEach(element => {
    element.draw();
  });

  if(electricFieldShown){
    drawElectricField();
  }
}


function keyPressed(){
  //wenn die "q" Taste gedrückt wird, male ein Proton
  //wenn die "w" Taste gedrückt wird, male ein Elektron
  //wenn die "e" Taste gedrückt wird, zeige das elektrische Feld
  //wenn die "r" Taste gedrückt wird, entferne das zuletzt erstellte Teilchen
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
  //finde die koordinate für jeden Pfeil
  for (let x = 0; x < 1200; x += 40) {
    for (let y = 0; y < 1200; y += 40) {
      let base = new Complex(x, y);
      //berechne E von base und multipliziere es mit der Ladung eines Fähnchens
      let F = calculateElectricFieldVector(base).mul(1e15);
      //erhalte den normalisierten Wert von F
      let absF = F.abs();
      F = F.mul(1/absF);
      drawArrow(base, new Complex(base.re + F.re, base.im + F.im),[35, 144, 145]);
    }
  }
}

function calculateElectricFieldVector(arrowPos){
  let sum = new Complex(0,0); //initialisiere let variabeln immer
  createdParticles.forEach(element => {
    //rechne E(r) aus. Dies ist bloß die Formel der Elektrischen Feldstärke
    let elementPos = element.pos;
    let distance = arrowPos.sub(elementPos);
    let absDistance = distance.abs();
    let normalizedDistance = distance.div(absDistance); 
    
    let E = normalizedDistance.mul(element.charge/ (absDistance * absDistance));
    //Addiere alle Elektrischen Felder zusammen um den finalen Wert aller Elektrischen Felder
    //am Punkt arrowPos zu erhalten.
    sum = sum.add(E);
  });
  sum = sum.div(k);
  return sum;
}

//zeichne einen Pfeil mit der basis und der gewünschte richtung
function drawArrow(base, pvector, color){
  push();

  let triangleSize = 10;
  let circleRadius = 5;
  let arrowlenght = 40;

  translate(base.re, base.im);
  /*Erstelle einen Vektor aus der gegbenen Complexen Zahl und transformiere sie*/
  let vector = createVector(pvector.re -base.re, pvector.im -base.im);
  vector.normalize();
  fill(color[0],color[1],color[2]);
  //male einen Kreis am Startpunkt
  circle(0,0,circleRadius);
  //Male eine Linie zum endpunkt
  stroke(color[0],color[1],color[2])
  line(0, 0, vector.x * arrowlenght, vector.y * arrowlenght);
  //rotiere in die Richtung des Vektors (in grad zum Startpunkt)
  rotate(vector.heading());
  /*mit vector.mag() erhält man das Ende des Vektors. Man subtrahiert
  mit triangleSize damit man die später hinzufügen kann ohne den
  Pfeil zu lang zu machen*/
  translate(vector.mag() * 40 - triangleSize, 0);
  triangle(0, triangleSize / 2, 0, -triangleSize / 2, triangleSize, 0);
  
  pop();
}


