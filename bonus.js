class Bonus
{
  constructor(life)
  {
    this.x = random(width);
    this.y = random(height);
    this.col = color(0, 255, 0);
    this.lifeBonus = player.maxLife / 4;
    this.r = 5;
    this.lease = 5; //in seconds
    this.start = millis();
    this.dead = false;
  }

  draw()
  {
    stroke(0, map((millis() - this.start) / 1000, 0, this.lease, 255, 0), 0);
    fill(0, map((millis() - this.start) / 1000, 0, this.lease, 100, 0), 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);

    this.dead = ((millis() - this.start) / 1000 > this.lease) ? true : false;
  }

  addLife()
  {
    if (player.life + this.lifeBonus <= player.maxLife)
    {
      player.life += this.lifeBonus;
    }
  }
}