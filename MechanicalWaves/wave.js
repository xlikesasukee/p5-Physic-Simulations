class Wave{
    amplitude = 100;
    swingDuration = 200;
    waveLength = 50;

    xPos;
    yPos;
    color;

    amplitudeSlider;
    swingDurationSlider;
    waveLengthSlider;

    constructor(xPos,yPos, color, sliderPosX){
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;

        //create the sliders
        this.amplitudeSlider = new Slider(sliderPosX,50,0,200,100,'Amplitude',color);
        this.swingDurationSlider = new Slider(sliderPosX,100,-100,100,100,'Swing Duration',color);
        this.waveLengthSlider = new Slider(sliderPosX,150,-200,200,100,'Wave Length',color);
    }

    //show the wave function for specified time t
    show(t){
        push();
        this.amplitudeSlider.showText();
        this.swingDurationSlider.showText();
        this.waveLengthSlider.showText();

        this.amplitude = this.amplitudeSlider.value();
        this.swingDuration = this.swingDurationSlider.value();
        this.waveLength = this.waveLengthSlider.value();

        translate(this.xPos,this.yPos);
        //get every x point on the canvas
        for(let x=0;x<width;x++){
            //calculate each y value for each point x at time t with changed values
            let y = this.waveFunction(x,t,this.amplitude,this.swingDuration,this.waveLength);
            stroke(this.color);
            strokeWeight(10);
            point(x, y);
          }
        pop();
    }

    //this is the function for a harmonic moving wave
    waveFunction(xPos,timePassed,amplitude,swingDuration,waveLength){
        return amplitude * sin(2*PI*((timePassed/swingDuration)-(xPos/waveLength)));
    }
}