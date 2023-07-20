


function addPlayerToPool(divId, x, y, color) {
    const pool = document.getElementById("canvas");
  
    // Create a new <div> element for the player
    const player = document.createElement("div");
    player.className = "item";
    player.style.position = "absolute";
    player.style.width = "50px"; // Set the width of the player's <div>
    player.style.height = "50px"; // Set the height of the player's <div>
    player.style.backgroundColor = color; // Set the background color of the player's <div>
    player.style.borderRadius = '30px'; // Set the position of the player
    player.style.left = x + "px"; // Set the x-coordinate
    player.style.top = y + "px"; // Set the y-coordinate
  
    // Append the player's <div> to the pool
    //pool.appendChild(player);
    return player;
  }
  
  // Example usage:
  var gg = addPlayerToPool("player1", 100, 150, 'blue');
  var gg2 = addPlayerToPool("player2", 250, 50, 'red');

function setupBall(ball) {
    ball.dataset.location = "";
   
    document.body.appendChild(ball);


    ball.onmousedown = function(event) {
        // (1) prepare to moving: make absolute and on top by z-index
        stopPainting()
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



var players = [ gg, gg2]
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

//draw stuff

// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', ()=>{
        
    resize(); // Resizes the canvas once the window loads
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});
    
const canvas = document.querySelector('#canvas');
   
// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');
    
// Resizes the canvas to the available size of the window.
function resize(){
  ctx.canvas.width =  600;
  ctx.canvas.height = 500 ;
}
    
// Stores the initial position of the cursor
let coord = {x:0 , y:0}; 
   
// This is the flag that we are going to use to 
// trigger drawing
let paint = false;
    
// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered.
function getPosition(event){
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
  
// The following functions toggle the flag to start
// and stop drawing
function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}

var strokefill = 'black';

function changeColorToRed(){
    strokefill = 'red';
}
function changeColorToBlack(){
    strokefill = 'black';
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();
    
  ctx.lineWidth = 5;
   
  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = 'round';
    
  ctx.strokeStyle = strokefill;
      
  // The cursor to start drawing
  // moves to this coordinate
  ctx.moveTo(coord.x, coord.y);
   
  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event);
   
  // A line is traced from start
  // coordinate to this coordinate
  ctx.lineTo(coord.x , coord.y);
    
  // Draws the line.
  ctx.stroke();
}