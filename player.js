class Player
{
  constructor(x, y, r, angle)
  {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle; //in degrees
    this.rotationSpeed = 3;
    this.life = 100;
    this.score = 0;

    this.bulletLease = 0.3; //in seconds
    this.timex = 0;
    this.bullets = [];
  }

  shot()
  {
    this.bullets.push(new Bullet(this.x, this.y, this.angle));
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
      if (dist(this.x, this.y, asteroids[i].position.x, asteroids[i].position.y) < asteroids[i].r)
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
    translate(this.x, this.y);
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

    if (millis() - this.timex > 1000 * this.bulletLease)
    {
      this.timex = millis();
      this.shot();
    }


    if ((keyIsPressed && keyCode === LEFT_ARROW) || (mouseIsPressed && mouseX < width / 2))
    {
      this.angle -= this.rotationSpeed;
    }

    if ((keyIsPressed && keyCode === RIGHT_ARROW) || (mouseIsPressed && mouseX > width / 2))
    {
      this.angle += this.rotationSpeed;
    }

  }
}