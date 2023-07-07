class Slider{
    slider;
    showTextVar = true;

    constructor(xPos,yPos, min,max, defaultValue, name, color){
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
        this.max = max;
        this.min = min;
        this.default = defaultValue;
        this.color = color;

        this.slider = createSlider(this.min, this.max, this.default);
        this.slider.position(this.xPos, this.yPos);
        this.slider.style('width', '200px');

    }
    //show text
    showText(){
        if(this.showTextVar){
            textSize(20);
            fill(this.color);
            text(this.name, this.xPos,this.yPos+40);
        }
    }
    //hide text
    hide(){
        this.slider.hide();
        this.showTextVar = false;
    }
    //get slider value
    value(){
        return this.slider.value();
    }
}