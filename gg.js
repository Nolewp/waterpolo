var playerItems = document.querySelectorAll(".item");

playerItems.forEach(function(item) {
    // item.dataset.currentX = 0;
    // item.dataset.currentY = 0;
    // item.dataset.initialX = 0;
    // item.dataset.initialY = 0;
    // item.dataset.xOffset = 0;
    // item.dataset.yOffset = 0;
})

function setupBall(ball) {
    ball.dataset.location = "";
   
    document.body.appendChild(ball);


    ball.onmousedown = function(event) {
        // (1) prepare to moving: make absolute and on top by z-index
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;


        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(ball);

        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
        ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
        ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
        }

        // move our absolutely positioned ball under the pointer
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            ball.dataset.initialX = ball.clientX ;
            ball.dataset.initialY = ball.clientY ;
        }

        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // (3) drop the ball, remove unneeded handlers
        ball.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            ball.onmouseup = null;
        };
        ball.ondragstart = function() {
            return false;
        };
    };
}

//var ball1 = document.getElementById('ball1');


function makePlayer(id, x,y, color) {
    var player = document.createElement('div') ;
    player.style.top = y + 'px';
    player.id = id;
    player.className = color;
    return player
}

var ball2 = makePlayer('ball2',50, 100, 'ball');
//var ball3 = document.getElementById('ball3');
// var ball4 = document.getElementById('ball4');
// var ball5 = document.getElementById('ball5');
// var ball6 = document.getElementById('ball6');
// var ball7 = document.getElementById('ball7');
// var ball8 = document.getElementById('ball8');
// var ball9 = document.getElementById('ball9');
// var ball10 = document.getElementById('ball10');
// var ball11 = document.getElementById('ball11');
// var ball12 = document.getElementById('ball12');
// var ball13 = document.getElementById('ball13');
// var ball14 = document.getElementById('ball14');

function setlocation(ball, topdown, leftright) {
    var vwValue = parseFloat(leftright);
    var pixelLeft = (vwValue / 100) * window.innerWidth;
    var vhValue = parseFloat(topdown);
    var pixelTop = (vhValue / 100) * window.innerHeight;
    console.log(pixelTop);
    ball.style.left = pixelLeft + 'px';
    ball.style.top = pixelTop + 'px';
    console.log('hey');
    return ball;
}

function setUp(ball, topdown, leftright) {
    var vwValue = parseFloat(leftright);
    var pixelLeft = (vwValue / 100) * window.innerWidth;
    var vhValue = parseFloat(topdown);
    var pixelTop = (vhValue / 100) * window.innerHeight;
    console.log(pixelTop);
    ball.style.left = pixelLeft + 'px';
    ball.style.top = pixelTop + 'px';
    console.log('hey');
    return ball;
}

function gg(){
    setUp(ball10, 50, 10)
}


var players = [ ball2]
// ball3, ball4, ball5, ball6, ball7,
 //    ball8, ball9, ball10, ball11, ball12, ball13, ball14];

var balls = players; // Set balls as the list of balls

var moves = []

function Save() {
    balls.forEach(function(ball) {
        var currentdata = ball.dataset.location;
        var ballLocation = {
        left: ball.offsetLeft,
        top: ball.offsetTop
        };
        currentdata += ballLocation.left + '|' + ballLocation.top + ',';
        ball.dataset.location = currentdata;
    });
}

    

async  function playOnly(){
    var arrays = [];

    balls.forEach(function(ball){
        console.log('making drag item arrays');
        arrays.push([ball, ball.dataset.location.split(',')]);
    });

    var moves = [];

    arrays.forEach(function(array){
        for (let i = 0; i < array[1].length - 1; i++) {
        moves[i] = moves[i] || [];
        moves[i].push([array[0], array[1][i]]);
        console.log(moves[i]);
        }
    });

    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < moves[i].length; j++) {
        var position = moves[i][j];
        var xy = position[1].split('|');
        position[0].style.left = xy[0] + 'px';
        position[0].style.top =  xy[1] + 'px' ;
        }
        console.log('doing moving arrays');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
} 


for (let i = 0; i < players.length; i++) {
    setupBall(players[i]);
}





function reload() {
    location.reload();
}