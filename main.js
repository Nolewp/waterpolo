var dragItems = document.querySelectorAll(".item");
var container = document.querySelector("#container");

dragItems.forEach(function(dragItem) {
  dragItem.dataset.location = "";
})

moves = []


// Attach event listeners to each drag item
dragItems.forEach(function(ball){ 
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
})


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

  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < moves[i].length; j++) {
      var position = moves[i][j];
      var xy = position[1].split('|');
      position[0].style.left = xy[0] + 'px';
      position[0].style.top =  xy[1] + 'px';
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

function reload() {
  location.reload();
}
