var player;
var asteroids;
var timex = 0;
var timeLease = 0.9; //in seconds, used to spawn new asteroids

var timeLease2 = 10; //in seconds, used to increase difficulty
var timex2 = 0;

function setup()
{
  createCanvas(600, 600);
  player = new Player(300, 300, 50, 90);
  asteroids = [];
  initAsteroids();
}

function draw()
{
  background(0);
  player.draw();
  player.update();

  drawGUI();

  updateAsteroids();

  if (millis() - timex2 > 1000 * timeLease2)
  {
    timex2 = millis();
    if (timeLease > 0.5)
      timeLease -= 0.05;
  }
}

function drawGUI()
{
  textSize(24);
  stroke(0, 255, 0);
  text(floor(player.life), width - 50, 30);
  stroke(255, 0, 0);
  text(floor(player.score), 15, 30);
  stroke(0, 0, 255);
  text(map(timeLease, 0.9, 0.5, 1, 10).toFixed(0), 290, 30);
}

function updateAsteroids()
{
  for (var i = asteroids.length - 1; i >= 0; i--)
  {
    asteroids[i].draw();
    asteroids[i].update();

    if (asteroids[i].position.x < -500 || asteroids[i].position.x > width + 500 || asteroids[i].position.y < -500 || asteroids[i].position.y > height + 500)
    {
      asteroids.splice(i, 1);
    }
  }

  if (millis() - timex > 1000 * timeLease)
  {
    timex = millis();
    asteroids.push(new Asteroid());
  }

}

function initAsteroids()
{
  for (var i = 0; i < 10; i++)
  {
    asteroids.push(new Asteroid());
  }
}