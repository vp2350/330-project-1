/** @format */

(function () {
    'use strict';
    console.log('index.js loaded');
    function test() {
        console.log('test');
    }

    const canvasWidth = window.innerWidth * 0.6,
        canvasHeight = window.innerHeight * 0.6;
    let ctx;
    let n = 0;
    let divergence = 137.5;
    let c = 2;
    let strokeColor = `hsl(${(n / 5) % 181},80%,40%)`;
    let array = [];
    window.onload = init;
    let increase = 1;
    let clear = 3;
    let previous = 2;

    function init() {
        ctx = canvas.getContext('2d');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        canvas.onclick = canvasClicked;
        update();
        document.querySelector('#clearButton').onclick = clsPure;
        
        //Dot padding change
        document.querySelector('#cValue').onchange = function (e) {
            clearCheck();
            if (previous == 2) c = e.target.value;
            else {
                for (let i = 0; i < array.length; i++) {
                    c = e.target.value;
                    array[i].c = c;
                }
            }
        };
        
        //divergence angle change
        document.querySelector('#dAngle').onchange = function (e) {
            clearCheck();
            if (previous == 2) divergence = e.target.value;
            else {
                for (let i = 0; i < array.length; i++) {
                    divergence = e.target.value;
                    array[i].divergence = divergence;
                }
            }
        };
        
        //Radius increase rate change
        document.querySelector('#increaseValue').onchange = function (e) {
            clearCheck();
            if (previous == 2) increase = parseInt(e.target.value);
            else {
                for (let i = 0; i < array.length; i++) {
                    increase = parseInt(e.target.value);
                    array[i].increase = increase;
                }
            }
        };
        
        //Line color change
        document.querySelector('#lineColorChooser').onchange = function (e) {
            clearCheck();
            //If not changing previous phyllotaxis
            if (previous == 2) {
                if (e.target.value == 'emojiPattern') {
                    //let emoji1 = document.getElementById("emoji");
                    let emoji1 = document.querySelector('#emoji');
                    let pattern1 = ctx.createPattern(emoji1, 'repeat');
                    strokeColor = pattern1;
                } else if (e.target.value == 'linearGradient') {
                    let grad = ctx.createLinearGradient(100, 0, 1000, 0);
                    grad.addColorStop(0, 'red');
                    grad.addColorStop(1 / 6, 'orange');
                    grad.addColorStop(2 / 6, 'yellow');
                    grad.addColorStop(3 / 6, 'green');
                    grad.addColorStop(4 / 6, 'aqua');
                    grad.addColorStop(5 / 6, 'blue');
                    grad.addColorStop(1, 'purple');

                    strokeColor = grad;
                } else if (e.target.value == 'radialGradient') {
                    let grad = ctx.createRadialGradient(
                        500,
                        350,
                        20,
                        500,
                        350,
                        600
                    );
                    grad.addColorStop(0, 'red');
                    grad.addColorStop(1 / 6, 'orange');
                    grad.addColorStop(2 / 6, 'yellow');
                    grad.addColorStop(3 / 6, 'green');
                    grad.addColorStop(4 / 6, 'aqua');
                    grad.addColorStop(5 / 6, 'blue');
                    grad.addColorStop(1, 'purple');

                    //ctx.fillStyle = grad;
                    //ctx.fillRect(0,0,640,480);
                    strokeColor = grad;
                }
                else if (e.target.value == 'randomMeme') {
                    let source='#Image'+Math.floor(Math.random()*7);
                    let meme = document.querySelector(source);
                    let pattern1 = ctx.createPattern(meme, 'repeat');
                    strokeColor = pattern1;
                }
            }  
            //If changing the previous phyllotaxes colors as well
               else {
                for (let i = 0; i < array.length; i++) {
                    if (e.target.value == 'emojiPattern') {
                        //let emoji1 = document.getElementById("emoji");
                        let emoji1 = document.querySelector('#emoji');
                        let pattern1 = ctx.createPattern(emoji1, 'repeat');
                        strokeColor = pattern1;
                        array[i].strokeColor = strokeColor;
                        array[i].colorCheck = 'emojiPattern';
                    } 
                    else if (e.target.value == 'linearGradient') {
                        let grad = ctx.createLinearGradient(100, 0, 1000, 0);
                        grad.addColorStop(0, 'red');
                        grad.addColorStop(1 / 6, 'orange');
                        grad.addColorStop(2 / 6, 'yellow');
                        grad.addColorStop(3 / 6, 'green');
                        grad.addColorStop(4 / 6, 'aqua');
                        grad.addColorStop(5 / 6, 'blue');
                        grad.addColorStop(1, 'purple');

                        strokeColor = grad;
                        array[i].strokeColor = strokeColor;
                        array[i].colorCheck = 'linearGradient';
                    } 
                    else if (e.target.value == 'radialGradient') {
                        let grad = ctx.createRadialGradient(
                            500,
                            350,
                            20,
                            500,
                            350,
                            600
                        );
                        grad.addColorStop(0, 'red');
                        grad.addColorStop(1 / 6, 'orange');
                        grad.addColorStop(2 / 6, 'yellow');
                        grad.addColorStop(3 / 6, 'green');
                        grad.addColorStop(4 / 6, 'aqua');
                        grad.addColorStop(5 / 6, 'blue');
                        grad.addColorStop(1, 'purple');

                        //ctx.fillStyle = grad;
                        //ctx.fillRect(0,0,640,480);
                        strokeColor = grad;
                        array[i].strokeColor = strokeColor;
                        array[i].colorCheck = 'radialGradient';
                    } 
                    else if(e.target.value=='randomMeme'){
                        let source='#Image'+Math.floor(Math.random()*7);
                        let meme = document.querySelector(source);
                        let pattern1 = ctx.createPattern(meme, 'repeat');
                        strokeColor = pattern1;
                        array[i].strokeColor=strokeColor;
                        array[i].colorCheck = "randomMeme";      
                    }
                    else if (e.target.value == 'Random') {
                        array[i].colorCheck = 'Random';
                    } 
                    else if (e.target.value == 'HSL') {
                        array[i].colorCheck = 'HSL';
                    }
                }
            }
        };
        
        //Clearing all or none
        document.querySelector('#clearSettings').onchange = function (e) {
            if (e.target.value == 'yes') {
                clear = 1;
            } else if (e.target.value == 'yesP') {
                clear = 2;
            } else {
                clear = 3;
            }
        };
        document.querySelector('#previousSettings').onchange = function (e) {
            if (e.target.value == 'yes') {
                previous = 1;
            } else {
                previous = 2;
            }
        };
    }
    
    //Update loop
    function update() {
        setTimeout(update, 1000 / 80);
        //requestAnimationFrame(update);
        for (let i = 0; i < array.length; i++) {
            array[i].n = array[i].drawPhyllotaxis();;
        }
    }
    
    //clears everything
    function clsPure() {
        array = [];
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    
    //check whether to clear everything or not on settings change
    function clearCheck() {
        if (clear == 1) {
            array = [];
            vpLIB.cls(ctx, canvasWidth, canvasHeight);
        } else if (clear == 2) {
            vpLIB.cls(ctx, canvasWidth, canvasHeight);
        }
    }
    
    //returns where canvas was clicked and generates a phyllotaxis
    function canvasClicked(e) {
        let rect = e.target.getBoundingClientRect();
        let mouseX = e.clientX - rect.x;
        let mouseY = e.clientY - rect.y;
        console.log(mouseX, mouseY);

        let xPosition = mouseX;
        //let phyllotaxis=new Object();
        let yPosition = mouseY;
        let colorCheck = document.querySelector('#lineColorChooser').value;
        let phyllotaxisObject = new Phyllotaxis(
            xPosition,
            yPosition,
            colorCheck,
            n,
            c,
            strokeColor,
            divergence,
            increase,
            ctx
        );

        array.push(phyllotaxisObject);
    }
})();
