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
  video.elt.setAttribute('playsinline', '');
  video.hide();

  loadImage('frame2.png', function(img) { frameImg = img; }); 
  loadImage('bg1.jpg', function(img) { bgImg = img; });
}

function drawCameraCover(img) {
  if (img.width === 0 || img.height === 0) return;

  let vRatio = img.width / img.height;
  let cRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
  let dW, dH, dX, dY;

  if (vRatio > cRatio) {
    dH = CANVAS_HEIGHT;
    dW = dH * vRatio;
    dX = (CANVAS_WIDTH - dW) / 2;
    dY = 0;
  } else {
    dW = CANVAS_WIDTH;
    dH = dW / vRatio;
    dX = 0;
    dY = (CANVAS_HEIGHT - dH) / 2;
  }

  push();
  translate(CANVAS_WIDTH, 0);
  scale(-1, 1);
  image(img, dX, dY, dW, dH);
  pop();
}

function draw() {
  if (bgImg) {
    image(bgImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    background('#f9f9f9');
  }

  drawingContext.filter = 'brightness(100%) contrast(50%) saturate(50%) blur(1.5px)';

  if (capturedImg !== null) {
    drawCameraCover(capturedImg);
  } else if (video && video.elt && video.elt.readyState >= 2) { 
    drawCameraCover(video);
  } else {
    drawingContext.filter = 'none';
    fill('#504231'); noStroke(); textSize(30); textAlign(CENTER, CENTER);
    text("작은 친구와 함께 웃어보아요,,", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }

  drawingContext.filter = 'none';

  if (frameImg) {
    image(frameImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    noFill(); noStroke();
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
