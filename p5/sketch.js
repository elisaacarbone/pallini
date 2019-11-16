var circles = [];
var score = 0;
var numOfCircles = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);

//create the arrays of circles
  for (i = 0; i < numOfCircles; i++) {
    circles[i] = new Circle();
  }
}

function draw() {
  background("#17183B");

//draw the ellipse that will be used as a cursor
  var x = map(rotationY, -160, 100, -height, height);
  var y = map(rotationX, -180, 80, -height, height);
  fill("GOLD");
  noStroke();
  ellipse(x, y, 40);

  //draw the circles and define what will happen when circles.dead is true
  for (var i = 0; i < circles.length; i++) {
    if (circles[i].dead()) {
      circles.splice(i,1);
      score++;
    }
    circles[i].display();
  }

//create the instructions for the user, that will disappear once the user understands how to play
  if (score <= 2) {
    textSize(12);
    textAlign(CENTER, CENTER);
    fill("#F1E9DA");
    text("MOVE YOUR PHONE TO CATCH THE DOTS!", width/2, height - 40);
  }

//final: if the user catches all the dots he will win
  if (score >= numOfCircles - 1) {
    fill(84, 19, 136, 200);
    rect(0,0, width, height);

    textSize(24);
    textAlign(CENTER, CENTER);
    fill("#F1E9DA");
    text("YOU WON!", width/2, height/2);
  }

}

//define the object circle and it's behaviour
function Circle() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.size = 60;
  this.color = color(219, 43, 57, 200);

//define the appearence of the circles
  this.display = function() {
      noStroke();
      fill(this.color);
      ellipse(this.x, this.y, this.size);
  }

//define what happens when the user overlaps the circles with the cursor circle
  this.dead = function() {
    var d = dist(map(rotationY, -160, 100, -height, height), map(rotationX, -180, 80, -height, height), this.x, this.y);
    if (d < 30) {
      return true;
    } else {return false;}
  }
}

//define that the page will not slide when touched
function touchMoved() {
  return false;
}

//alloew the device orientation ios 13
function touchEnded() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (e) => {})
      }
    })
    .catch(console.error)
}
