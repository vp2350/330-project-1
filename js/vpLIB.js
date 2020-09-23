
"use strict";
function test() {
    console.log("test");
}

const canvasWidth = 1080, canvasHeight = 700;
let ctx;
let n=0; 
let divergence = 137.5;
let c = 2;   
let strokeColor=`hsl(${n/5 % 181},80%,40%)`;
let array=[];
window.onload=init;
let increase=1;
let clear=3;

function init(){
	ctx = canvas.getContext("2d");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
    canvas.onclick=canvasClicked;
    update();
    document.querySelector("#clearButton").onclick=clsPure;
    
    document.querySelector('#cValue').onchange = function(e){
        clearCheck();
        c=e.target.value;
    }
    document.querySelector('#dAngle').onchange = function(e){
        clearCheck();
        divergence=e.target.value;
    }
    document.querySelector('#increaseValue').onchange = function(e){
        clearCheck();
        increase=parseInt(e.target.value);
    }
    document.querySelector('#lineColorChooser').onchange = function(e){
        clearCheck();
        if (e.target.value == "emojiPattern"){
            //let emoji1 = document.getElementById("emoji");
            let emoji1= document.querySelector("#emoji");
            let pattern1= ctx.createPattern(emoji1, "repeat");
            strokeColor = pattern1;
        }
        else if (e.target.value == "linearGradient"){
            	let grad = ctx.createLinearGradient(100, 0, 1000, 0);
	            grad.addColorStop(0, 'red');
	            grad.addColorStop(1 / 6, 'orange');
	            grad.addColorStop(2 / 6, 'yellow');
	            grad.addColorStop(3 / 6, 'green')
	            grad.addColorStop(4 / 6, 'aqua');
	            grad.addColorStop(5 / 6, 'blue');
	            grad.addColorStop(1, 'purple');

                strokeColor = grad;
        }
        else if (e.target.value == "radialGradient"){
	           let grad = ctx.createRadialGradient(500,350, 20, 500, 350, 600);
	           grad.addColorStop(0, 'red');
	           grad.addColorStop(1 / 6, 'orange');
	           grad.addColorStop(2 / 6, 'yellow');
	           grad.addColorStop(3 / 6, 'green')
	           grad.addColorStop(4 / 6, 'aqua');
	           grad.addColorStop(5 / 6, 'blue');
	           grad.addColorStop(1, 'purple');
	           
	           //ctx.fillStyle = grad;
	           //ctx.fillRect(0,0,640,480);
               strokeColor = grad;
        }
	}
    document.querySelector('#clearSettings').onchange = function(e){
        if (e.target.value == "yes"){
            clear=1;
        }
        else if (e.target.value == "yesP"){
            clear=2;
        }
        else{
            clear=3;
        }

        
	}
}

function update(){
    setTimeout(update,2000/80);
    let colorCheck=document.querySelector('#lineColorChooser').value;
    if(colorCheck=="HSL")
        {
            strokeColor=`hsl(${n/5 % 181},80%,40%)`;
        }
    else if(colorCheck=="Random")
        {
            strokeColor=getRandomColor();
        }
    //requestAnimationFrame(update);
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
    //let color = getRandomColor();
    let color = strokeColor;

    n+=2;
    if(document.querySelector('#lineColorChooser').value=="emojiPattern")
    {
        drawCircle(ctx,x,y,4,color);
    }
    else{
        drawCircle(ctx,x,y,2,color);
    }
    phyllotaxis.n+=increase;
    return phyllotaxis.n+=increase;
}
function cls(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}
function clsPure(){
    array=[];
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}
function clearCheck()
{
    if(clear==1)
    {
        array=[];
        cls();
    }
    else if(clear==2)
    {
        cls();
    }
}
// UTILS
function getRandomColor(){
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;

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
