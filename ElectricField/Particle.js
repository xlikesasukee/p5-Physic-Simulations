class Particle {
    constructor(pos, charge) {
      this.pos = pos;
      this.charge = charge;
    }
  
    draw() {
      if(this.charge === -1.602176e-19){
        // draw Electron
        push();
        fill(84, 116, 214);
        translate(this.pos.re, this.pos.im);
        circle(0, 0, circleDiameter);
        fill(255, 255, 255);
        rect(-rectangleSizeX * (1 / 2), -rectangleSizeY * (1 / 2), rectangleSizeX, rectangleSizeY);
        pop();
      }else{
        // draw Proton
        push();
        fill(252, 164, 10);
        translate(this.pos.re, this.pos.im);
        circle(0, 0, circleDiameter);
        fill(255, 255, 255);
        rect(-rectangleSizeX * (1 / 2), -rectangleSizeY * (1 / 2), rectangleSizeX, rectangleSizeY);
        rotate(PI / 2);
        rect(-rectangleSizeX * (1 / 2), -rectangleSizeY * (1 / 2), rectangleSizeX, rectangleSizeY);
        pop();
      }
    }
}