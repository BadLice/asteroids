class Bullet
{
  constructor(x, y, r)
  {
    this.alive = true;
    this.angle = r;
    this.h = 10;
    this.w = 2;
    this.position = createVector(x, y);
    this.velocity = createVector(0, -3);
    this.velocity.rotate(radians(this.angle));
    this.col = color(random(50, 255), random(50, 255), random(50, 255));
  }

  draw()
  {
    push();
    fill(this.col);
    stroke(this.col)
    translate(this.position.x, this.position.y);
    rotate(radians(this.angle));
    rect(-this.w / 2, 0, this.w, -this.h);
    pop();
  }

  update()
  {
    this.position.add(this.velocity);
  }

  collision()
  {
    for (var i = asteroids.length - 1; i >= 0 && this.alive; i--)
    {
      if (dist(this.position.x, this.position.y, asteroids[i].position.x, asteroids[i].position.y) < asteroids[i].r && this.alive)
      {
        player.score += asteroids[i].r;
        if (asteroids[i].r / 2 > 10)
        {
          asteroids.push(new Asteroid(asteroids[i].position.x, asteroids[i].position.y, asteroids[i].velocity.x, asteroids[i].velocity.y, asteroids[i].r));
          asteroids.push(new Asteroid(asteroids[i].position.x, asteroids[i].position.y, asteroids[i].velocity.x, asteroids[i].velocity.y, asteroids[i].r));
        }

        asteroids.splice(i, 1);

        this.alive = false;
      }
    }
  }
}