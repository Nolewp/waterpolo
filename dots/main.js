var dragItems = document.querySelectorAll(".item");
var container = document.querySelector("#container");

// Attach event listeners to each drag item
dragItems.forEach(function(dragItem) {
  // Set initial values for each item
  dragItem.dataset.currentX = 0;
  dragItem.dataset.currentY = 0;
  dragItem.dataset.initialX = 0;
  dragItem.dataset.initialY = 0;
  dragItem.dataset.xOffset = 0;
  dragItem.dataset.yOffset = 0;

  //dragItem.addEventListener("touchstart", dragStart, false);
 // dragItem.addEventListener("touchend", dragEnd, false);
  //dragItem.addEventListener("touchmove", drag, false);

  dragItem.addEventListener("mousedown", dragStart, false);
  dragItem.addEventListener("mouseup", dragEnd, false);
  dragItem.addEventListener("mousemove", drag, false);
});

function dragStart(e) {
  var dragItem = e.target;

  if (e.type === "touchstart") {
    dragItem.dataset.initialX = e.touches[0].clientX - dragItem.dataset.xOffset;
    dragItem.dataset.initialY = e.touches[0].clientY - dragItem.dataset.yOffset;
  } else {
    dragItem.dataset.initialX = e.clientX - dragItem.dataset.xOffset;
    dragItem.dataset.initialY = e.clientY - dragItem.dataset.yOffset;
  }

  if (dragItem.classList.contains("item")) {
    dragItem.dataset.active = "true";
  }
}

function dragEnd(e) {
  var dragItem = e.target;

  dragItem.dataset.initialX = dragItem.dataset.currentX;
  dragItem.dataset.initialY = dragItem.dataset.currentY;

  dragItem.dataset.active = "false";
}

function drag(e) {
  var dragItem = e.target;

  if (dragItem.dataset.active === "true") {
    e.preventDefault();

    if (e.type === "touchmove") {
      dragItem.dataset.currentX = e.touches[0].clientX - dragItem.dataset.initialX;
      dragItem.dataset.currentY = e.touches[0].clientY - dragItem.dataset.initialY;
    } else {
      dragItem.dataset.currentX = e.clientX - dragItem.dataset.initialX;
      dragItem.dataset.currentY = e.clientY - dragItem.dataset.initialY;
    }

    dragItem.dataset.xOffset = dragItem.dataset.currentX;
    dragItem.dataset.yOffset = dragItem.dataset.currentY;

    setTranslate(dragItem.dataset.currentX, dragItem.dataset.currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
