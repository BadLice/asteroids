var player;
var asteroids;
var timex = 0;
var timeLease = 0.9; //in seconds, used to spawn new asteroids

var timeLease2 = 30; //in seconds, used to increase difficulty
var timex2 = 0;

function setup()
{
  createCanvas(800, 800);
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
  text("Lvl: " + getHardness(), width / 2 - 20, 30);
  text((timeLease2 - ((millis() - timex2) / 1000)).toFixed(1), width / 2 - 10, 50);
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

function getHardness()
{
  return map(timeLease, 0.9, 0.5, 1, 10).toFixed(0);
}