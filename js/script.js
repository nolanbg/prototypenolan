var soundtrack;
var playbutton, stopbutton;
var analyzer;

function preload()
{
  soundtrack = loadSound('memory-nolan.mp3');
}

let school = [];
let schoolSize = 800;


function setup() {
createCanvas(windowWidth, 600);
// loop sound
 soundtrack.loop();

 // stop sound to prevent it from playing automatically
 soundtrack.stop();

 // play button
 playbutton = createButton('Play');
 playbutton.position(25, 25);
 playbutton.mousePressed(playsound);

 // stop button
 stopbutton = createButton('Stop');
 stopbutton.position(75, 25);
 stopbutton.mousePressed(stopsound);

 // music visualizer
 analyzer = new p5.Amplitude();
 analyzer.setInput(soundtrack);
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}
// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 15,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return fish;
}
background(0);

// draw()
// Moves and displays our fish
function draw() {

  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }

}

function mousePressed() {
  let fish = createFish(mouseX,mouseY); // Create a fish at the mouse position
  school.push(fish); // Add the fish to our array
  // Now the school array has our new fish and it will be moved and drawn
  // with all the others in the for loop!
}

// moveFish(fish)
// Chooses whether the provided fish changes direction and moves it
function moveFish(fish) {
  // Choose whether to change direction
  var vol = analyzer.getLevel();
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed)*map(vol, 0, 1, 0, width)/1000;
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  var vol = analyzer.getLevel();
  noStroke();
    fill((Math.floor(Math.random()*40 + 1))*map(vol, 0, 1, 0, width)/50,0,(Math.floor(Math.random() * 1000 + 1)));
    noStroke();
    ellipse(fish.x, fish.y, (Math.floor(Math.random()*5 + 1))*map(vol, 0, 1, 0, width)/50, (Math.floor(Math.random()*5 + 1))*map(vol, 0, 1, 0, height)/50);
    pop();
}
function playsound()
{
  if(soundtrack.isPlaying() == false)
  {
    soundtrack.play();
  }
}

function stopsound()
{
  if(soundtrack.isPlaying() == true)
  {
    soundtrack.pause();
  }
}
