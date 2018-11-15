class Player
{
  constructor(x, y, r, angle)
  {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.friction = createVector(0, 0);
    this.maxForce = 0.15;
    this.maxSpeed = 10;

    this.r = r;

    this.angle = angle; //in degrees
    this.rotationSpeed = 3;
    this.life = 100;
    this.score = 0;

    this.bulletLease = 0.3; //in seconds
    this.timex = 0;
    this.bullets = [];
    this.canShot = true;
  }

  shot()
  {
    this.bullets.push(new Bullet(this.position.x, this.position.y, this.angle));
  }

  drawBsullets()
  {
    for (var i = this.bullets.length - 1; i >= 0; i--)
    {
      if (this.bullets[i].position.x < -500 || this.bullets[i].position.x > width + 500 || this.bullets[i].position.y < -500 || this.bullets[i].position.y > height + 500)
      {
        this.bullets.splice(i, 1);
      }
      if (this.bullets[i].alive)
      {
        this.bullets[i].draw();
        this.bullets[i].update();
        this.bullets[i].collision()
      }
    }
  }

  gameOver()
  {
    if (this.life <= 0)
    {
      stroke(255, 0, 0);
      textSize(56);
      text("GAME OVER!", width / 2 - 175, height / 2);
      frameRate(0);
    }
  }

  collision()
  {
    for (var i = asteroids.length - 1; i >= 0; i--)
    {
      if (dist(this.position.x, this.position.y, asteroids[i].position.x, asteroids[i].position.y) < asteroids[i].r)
      {
        this.life -= asteroids[i].r;
        asteroids.splice(i, 1);
      }
    }
  }

  draw()
  {
    this.drawBsullets();
    this.gameOver();

    push();
    noFill();
    stroke(lerpColor(color(255, 0, 0), color(0, 255, 0), this.life / 100));
    translate(this.position.x, this.position.y);
    rotate(radians(this.angle));
    beginShape();
    vertex(this.r / 4, this.r / 4);
    vertex(-this.r / 4, this.r / 4);
    vertex(0, -this.r / 2);
    endShape(CLOSE);
    pop();
  }

  update()
  {
    this.collision();

    if (mouseIsPressed)
    {
      if (this.canShot && (millis() - this.timex > 1000 * this.bulletLease))
      {
        this.timex = millis();
        this.shot();
        this.canShot = false;
      }
    }
    else
      this.canShot = true;

    var target = createVector(0, 0);
    var desired = createVector(0, 0);
    var steer = createVector(0, 0);
    this.friction = this.velocity.copy();
    this.friction.mult(-0.02);

    if (keyIsDown(32))
    {
      target = p5.Vector.add(this.position, createVector(100 * cos(radians(this.angle - 90)), 100 * sin(radians(this.angle - 90))));
      desired = p5.Vector.sub(target, this.position);

      steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
    }

    this.acceleration.add(steer);
    this.velocity.add(this.acceleration);
    this.velocity.add(this.friction);
    this.velocity.limit(this.maxSpeed);

    var precpos = this.position.copy();

    this.position.add(this.velocity);

    if (!this.isInBounds(this.position.x, this.position.y))
      this.position = precpos.copy();

    this.acceleration.mult(0);

    this.angle = degrees(atan2(this.position.y - mouseY, this.position.x - mouseX)) - 90;

  }

  isInBounds()
  {
    return (this.position.x < width + 50 && this.position.x > -50 && this.position.y > -50 && this.position.y < height + 50);
  }

  isInBounds(x, y)
  {
    return (x < width + 50 && x > -50 && y > -50 && y < height + 50);
  }
}