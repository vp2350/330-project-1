
function test() {
console.log("test");
}
"use strict";
	const canvasWidth = 400, canvasHeight = 300;
	let ctx;
    let n=0; 
    const divergence = 137.5;
    const c = 2;   

    let array=[];
    window.onload=init;

	function init(){
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.fillRect(0,0,canvasWidth,canvasHeight);
        canvas.onclick=canvasClicked;
        update();
	}

    function update(){
        requestAnimationFrame(update);
        for(let i=0;i<array.length; i++){
            array[i].n=loop(array[i]);
        }
    }
    function loop(phyllotaxis){
        //setTimeout(loop,1000/80);
        // each frame draw a new dot
        // `a` is the angle
        // `r` is the radius from the center (e.g. "Pole") of the flower
        // `c` is the "padding/spacing" between the dots
        let a = phyllotaxis.n * dtr(divergence);
        let r = c * Math.sqrt(phyllotaxis.n);
		// now calculate the `x` and `y`
		let x = r * Math.cos(a) + phyllotaxis.xPosition;
		let y = r * Math.sin(a) + phyllotaxis.yPosition;
		//console.log(x,y);
        //console.log(a,r);
		//drawCircle(ctx, x, y, 2, "white");
        //let color = `rgb(${n % 256},0,255)`;
        //let aDegrees = (n * divergence) % 256;
        //let color = `rgb(${aDegrees},0,255)`;
        let color = `hsl(${phyllotaxis.n/5 % 181},80%,40%)`;

        drawCircle(ctx,x,y,2,color);
        phyllotaxis.n++;
        return phyllotaxis.n++;
    }
        
    // UTILS
	function getRandomColor(){
		function getByte(){
			return 55 + Math.round(Math.random() * 200);
		}
		return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
	}
    function canvasClicked(e){
        let rect = e.target.getBoundingClientRect();
        let mouseX = e.clientX - rect.x;
        let mouseY = e.clientY - rect.y;
        console.log(mouseX,mouseY);

        let xPosition= mouseX;
        let phyllotaxis=new Object();
        phyllotaxis.xPosition=xPosition;
        let yPosition= mouseY;
        phyllotaxis.yPosition=yPosition;
        phyllotaxis.n = 0;
        array.push(phyllotaxis);        
    }

	// helpers
	function dtr(degrees){
		return degrees * (Math.PI/180);
	}

	function drawCircle(ctx,x,y,radius,color){
		ctx.save();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

