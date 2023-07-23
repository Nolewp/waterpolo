

function addPlayerToPool(divId, x, y, color) {
  // Create a new <div> element for the player
  const player = document.createElement("div");
  player.className = divId + " Player";
  player.style.position = "absolute";
  if (color == 'yellow') {
    player.style.width = "25px"; // Set the width of the player's <div>
    player.style.height = "25px";
  }
  else {
    player.style.width = "40px"; // Set the width of the player's <div>
    player.style.height = "40px"; // Set the height of the player's <div>
  }

  player.boxShadow = '10px 20px 30px lightblue';

  player.style.backgroundColor = color; // Set the background color of the player's <div>
  player.style.borderRadius = '30px'; // Set the position of the player
  player.style.left = x + "px"; // Set the x-coordinate
  player.style.top = y + "px"; // Set the y-coordinate
  player.style.zIndex = '1000';
  player.style.position = 'absolute';
  let cs = document.getElementById('BallArea');
  // Append the player's <div> to the pool
  cs.prepend(player);
  return player;
}

// Example usage:
var bluePlayer1 = addPlayerToPool("item1",82, 131, 'blue');
var bluePlayer2= addPlayerToPool("item2", 167, 242, 'blue');
var bluePlayer3 = addPlayerToPool("item3", 324, 286, 'blue');
var bluePlayer4 = addPlayerToPool("item4", 464, 239, 'blue');
var bluePlayer5 = addPlayerToPool("item5", 564, 136, 'blue');
var bluePlayer6 = addPlayerToPool("item6", 324, 134, 'blue');

var redPlayer7 = addPlayerToPool("item7", 123, 124, 'red'); //1
var redPlayer8 = addPlayerToPool("item8", 200, 208, 'red'); //2
var redPlayer9 = addPlayerToPool("item9", 324, 238, 'red'); //3
var redPlayer10 = addPlayerToPool("item10", 431, 208, 'red'); //4
var redPlayer11 = addPlayerToPool("item11", 520, 124, 'red'); //5
var redPlayer12 = addPlayerToPool("item12", 324, 177, 'red'); //6
var redPlayer13 = addPlayerToPool("item13", 324, 76, 'red'); //golie
var redPlayer14 = addPlayerToPool("itemBall", 363, 313, 'yellow'); //ball

function showMousePosition(event) {

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  console.log(`Mouse X: ${mouseX}px, Mouse Y: ${mouseY}px`);
}

// Event listener for mouse down on the canvas
document.getElementById('canvas').addEventListener('mousedown', showMousePosition);


moves = []
dragItems = [bluePlayer1, bluePlayer2, bluePlayer3, bluePlayer4,
  bluePlayer5, bluePlayer6, redPlayer7, redPlayer8, redPlayer9,
  redPlayer10, redPlayer11, redPlayer12, redPlayer13, redPlayer14]
// Attach event listeners to each drag item
// Get all the ball elements with class "dragItem"
//const dragItems = document.querySelectorAll('.dragItem');

dragItems.forEach(function(ball) {
  ball.dataset.location = "";

  ball.onmousedown = function(event) {
    // (1) Prepare to move: make absolute and on top by z-index
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;

    // Store the initial position of the ball relative to the parent BallArea
    const initialX = event.pageX - ball.offsetLeft;
    const initialY = event.pageY - ball.offsetTop;
    
    function moveAt(pageX, pageY) {
      // Calculate the new position of the ball relative to the parent BallArea
      const newLeft = pageX - initialX;
      const newTop = pageY - initialY;
      
      // Set the new position
      ball.style.left = newLeft + 'px';
      ball.style.top = newTop + 'px';
      
    }

    // Move the ball to the current mouse position
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      // Move the ball to the new mouse position
      moveAt(event.pageX, event.pageY);
    }

    // (2) Move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (3) Drop the ball, remove unneeded handlers
    ball.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    };

    ball.ondragstart = function() {
      return false;
    };
  };
});



function Save() {
  dragItems.forEach(function(ball){
    
      var currentdata = ball.dataset.location;
      var ballLocation = {
      left: ball.offsetLeft,
      top: ball.offsetTop
      };
      currentdata = currentdata + ballLocation.left + '|' + ballLocation.top + ',';
      ball.dataset.location = currentdata;
  })
  moves.push([])
}
async function startCapture(displayMediaOptions) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return captureStream;
}

const displayMediaOptions = {
  video: {
    displaySurface: 'browser',
    logicalSurface: true,
  },
  audio: false
};

async function Play() {
  const stream = await startCapture(displayMediaOptions);

  // Define the MIME type of the video format you want to record, e.g., MP4
  const mimeType = 'video/webm';

  // Create a new instance of the MediaRecorder object, passing in the media stream and MIME type as parameters
  const recorder = new MediaRecorder(stream, { mimeType });

  // Define an array to hold the recorded video data as it is being generated
  let recordedChunks = [];

  // Set up event listeners for the MediaRecorder object to handle the recording process
  recorder.addEventListener('dataavailable', event => {
    // Add the recorded video data to the array of chunks
    recordedChunks.push(event.data);
  });

  recorder.addEventListener('stop', () => {
    // When recording is stopped, combine the chunks into a single Blob object that can be saved or streamed
    const recordedBlob = new Blob(recordedChunks, { type: mimeType });

    // Convert the Blob object into a URL that can be used to display or download the recorded video
    const recordedUrl = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = recordedUrl;
    a.download = 'my-video.webm';
    document.body.appendChild(a);
    a.click();
  

    // Do something with the recorded URL, such as display it in a video player or download it as a file
    console.log(recordedUrl);
  });

  var arrays = [];

  dragItems.forEach(function(dragItem){
    arrays.push([dragItem, dragItem.dataset.location.split(',')]);
  });

  var moves = [];

  arrays.forEach(function(array){
    for (let i = 0; i < array[1].length - 1; i++) {
      moves[i] = moves[i] || [];
      moves[i].push([array[0], array[1][i]]);
    }
  });

  recorder.start();

  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < moves[i].length; j++) {
      var position = moves[i][j];
      var xy = position[1].split('|');
      position[0].style.left = xy[0] + 'px';
      position[0].style.top =  xy[1] + 'px';
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  recorder.stop();

  stopCapture();

  function stopCapture() {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
}

async  function playOnly(){
  var arrays = [];
  var moves = [];

  dragItems.forEach(function(dragItem){
    arrays.push([dragItem, dragItem.dataset.location.split(',')]);
  });

  arrays.forEach(function(array){
    for (let i = 0; i < array[1].length - 1; i++) {
      moves[i] = moves[i] || [];
      moves[i].push([array[0], array[1][i]]);
    }
  });

  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < moves[i].length; j++) {
      var position = moves[i][j];
      var xy = position[1].split('|');
      position[0].style.left = xy[0] + 'px';
      position[0].style.top =  xy[1] + 'px';
    }
    console.log('moving')
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

function reload() {
  location.reload();
}


// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', ()=>{
  Save()
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
ctx.canvas.width =  650;
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
var container = document.getElementById('Container');

coord.x = event.clientX - container.offsetLeft - canvas.offsetLeft;
coord.y = event.clientY - canvas.offsetTop; //container.offsetTop 
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
  
ctx.lineWidth = 3;
 
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