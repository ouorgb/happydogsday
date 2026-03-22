let video;
let frameImg = null;
let bgImg = null; 
let capturedImg = null;

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

function setup() {
  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent('canvas-container');

  let constraints = { video: { facingMode: "user" }, audio: false };
  video = createCapture(constraints);
  video.size(CANVAS_WIDTH, CANVAS_HEIGHT);
  video.hide();

  loadImage('frame.png', function(img) { frameImg = img; });
  loadImage('bg1.jpg', function(img) { bgImg = img; });
}

function draw() {
  if (bgImg) {
    image(bgImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    background('#f9f9f9');
  }

  drawingContext.filter = 'brightness(150%) contrast(90%) saturate(180%) blur(0.8px)';

  if (capturedImg !== null) {
    push(); 
    translate(CANVAS_WIDTH, 0); 
    scale(-1, 1); 
    image(capturedImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    pop(); 
  } else if (video && video.elt && video.elt.readyState >= 2) { 
    push();
    translate(CANVAS_WIDTH, 0);
    scale(-1, 1);
    image(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    pop();
  } else {
    drawingContext.filter = 'none';
    fill('#504231'); noStroke(); textSize(30); textAlign(CENTER, CENTER);
    text("작은 친구와 함께 웃어보아요,,", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }

  drawingContext.filter = 'none';

  if (frameImg) {
    image(frameImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    noFill(); stroke('#504231'); strokeWeight(5);
    rect(5, 5, CANVAS_WIDTH - 10, CANVAS_HEIGHT - 10);
  }
}

function takePhoto() {
  if (video && video.elt && video.elt.readyState >= 2) { 
    capturedImg = video.get();
    document.getElementById('btn-capture').style.display = 'none';
    document.getElementById('btn-retake').style.display = 'block';
    document.getElementById('btn-save').style.display = 'block';
  } else {
    alert("카메라도 긴장했나봐요!");
  }
}

function retakePhoto() {
  capturedImg = null;
  document.getElementById('btn-capture').style.display = 'block';
  document.getElementById('btn-retake').style.display = 'none';
  document.getElementById('btn-save').style.display = 'none';
}

function savePhoto() {
  saveCanvas('with_my_small_friends', 'png');
}