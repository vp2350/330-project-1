
/** @format */

(function () {
    'use strict';
    //returns a random colow
    function getRandomColor() {
        var randomColor =
            '#' + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    }
    
    function dtr(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    //draw circle function
    function drawCircle(ctx, x, y, radius, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    //Clear screen function
    function cls(ctx, canvasWidth, canvasHeight) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // expose the "public" interface
    window['vpLIB'] = {
        getRandomColor,
        dtr,
        drawCircle,
        cls,
    };
})();

//Phyllotaxis Class
class Phyllotaxis {
    //class constructor
    constructor(
        xPosition,
        yPosition,
        colorCheck,
        n,
        c,
        strokeColor,
        divergence,
        increase,
         ctx
    ) {
        this.colorCheck = colorCheck;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.c = c;
        this.n = n;
        this.strokeColor = strokeColor;
        this.divergence = divergence;
        this.increase = increase;
        this.ctx=ctx;
    }
    
    //draws the phyllotaxis defined in the class
    drawPhyllotaxis()
    {
        let a = this.n * vpLIB.dtr(this.divergence);
        let r = this.c * Math.sqrt(this.n);
        // now calculate the `x` and `y`
        let x = r * Math.cos(a) + this.xPosition;
        let y = r * Math.sin(a) + this.yPosition;
        if (this.colorCheck == 'HSL') {
            this.strokeColor = `hsl(${
                (this.n / 5) % 181
            },80%,40%)`;
        } else if (this.colorCheck == 'Random') {
            this.strokeColor = vpLIB.getRandomColor();
        }
        let color = this.strokeColor;

        if (this.colorCheck == 'emojiPattern' || this.colorCheck == 'randomMeme') {
            vpLIB.drawCircle(this.ctx, x, y, 4, color);
        } else {
            vpLIB.drawCircle(this.ctx, x, y, 2, color);
        }
        this.n += this.increase;
        return (this.n += this.increase);
    }
}
