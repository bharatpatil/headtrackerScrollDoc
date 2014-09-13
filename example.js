var lastX = 0,
    lastY = 0,
    rebindInterval,
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    inMove = true,
    move = 0;

document.addEventListener('headtrackrStatus',
    function(event) {
        if (event.status == "getUserMedia") {
            // alert("getUserMedia is supported!");
        }
        var ua = (navigator && navigator.userAgent) ? navigator.userAgent : 'UnknownUserAgent';
        ga('send', 'event', 'HeadTrackerDemo', navigator.userAgent, event.status);
    }
);

var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');
var htracker = new headtrackr.Tracker({
    detectionInterval: 50
});

htracker.init(videoInput, canvasInput);
htracker.start();

document.addEventListener('headtrackingEvent', function(e) {
    //initialise canvas
    ctx.clearRect(0, 0, 200, 200);
    doCanvas();
    //move point
    var moved = document.getElementById('move'),
        bottom = parseInt((e.y * 18) - 50),
        left = parseInt((e.x * 12) + 100);
    moved.style.bottom = bottom + 'px';
    moved.style.left = left + 'px';
    if (inMove == true) {
        if (left <= 20) { //right
            if (move != 39) {
                move = 37;
                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(25, 25);
                ctx.lineTo(25, 175);
                ctx.lineTo(0, 160);
                ctx.lineTo(0, 40);
                ctx.fill();
                inMove = false;
                console.log('right');
            }
        } else if (left >= 135) { //left
            if (move != 37) {
                move = 39;
                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(175, 25);
                ctx.lineTo(175, 175);
                ctx.lineTo(200, 160);
                ctx.lineTo(200, 40);
                ctx.fill();
                inMove = false;
                console.log('left');
            }
        } else if (bottom >= 170) { //top
            if (move != 40) {
                move = 38;
                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(25, 25);
                ctx.lineTo(175, 25);
                ctx.lineTo(160, 0);
                ctx.lineTo(40, 0);
                ctx.fill();
                inMove = false;
                console.log('top');
            }
        } else if (bottom <= 22) { //bottom
            if (move != 38) {
                move = 40;
                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(25, 175);
                ctx.lineTo(175, 175);
                ctx.lineTo(160, 200);
                ctx.lineTo(40, 200);
                ctx.fill();
                inMove = false;
                console.log('bottom');
            }
        }
        scrollDoc();
        // if(start == false){
        //     start = true;
        //     moveSnake();
        //     startScore();
        // }
    }

});
doCanvas();

function doCanvas() {
    ctx.fillStyle = "rgb(255, 250, 50)";
    //left
    ctx.moveTo(25, 25);
    ctx.lineTo(25, 175);
    ctx.lineTo(0, 160);
    ctx.lineTo(0, 40);
    ctx.fill();
    //top
    ctx.moveTo(25, 25);
    ctx.lineTo(175, 25);
    ctx.lineTo(160, 0);
    ctx.lineTo(40, 0);
    ctx.fill();
    //right
    ctx.moveTo(175, 25);
    ctx.lineTo(175, 175);
    ctx.lineTo(200, 160);
    ctx.lineTo(200, 40);
    ctx.fill();
    //down
    ctx.moveTo(25, 175);
    ctx.lineTo(175, 175);
    ctx.lineTo(160, 200);
    ctx.lineTo(40, 200);
    ctx.fill();
}

function scrollDoc() {
    inMove = true;
    switch (move) {
        case 37:
            window.scrollTo(window.scrollX - 100, window.scrollY);
            break;
        case 38:
            window.scrollTo(window.scrollX, window.scrollY - 100);
            break;
        case 39:
            window.scrollTo(window.scrollX + 100, window.scrollY);
            break;
        case 40:
            window.scrollTo(window.scrollX, window.scrollY + 100);
            break;
    }
    move = 0;
}