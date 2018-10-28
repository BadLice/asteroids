class Asteroid
{
  constructor(x, y, vx, vy, r)
  {
    var maxSize = 80;
    var minSize = 40;
    var maxSpeed = 2;

    if (!x || !y || !vx || !vy || !r)
    {
      this.r = random(minSize, maxSize);

      var x, y;
      if (random(1) < 0.5)
      {
        x = random(-100, 0);
        this.velocity = createVector(map(this.r, 0, maxSize, maxSpeed, 0.5), map(this.r, 0, maxSize, maxSpeed, 0.5));
      }
      else
      {
        x = random(width, width + 100);
        // this.velocity = createVector(-random(2), random(2));
        this.velocity = createVector(-map(this.r, 0, maxSize, maxSpeed, 0.5), map(this.r, 0, maxSize, maxSpeed, 0.5));

      }

      this.position = createVector(x, random(height));
    }
    else
    {
      var x, y;
      this.velocity = createVector(vx * 1.8, vy * 1.8);
      this.velocity.rotate(radians(random(30)));

      this.position = createVector(x, y);
      this.r = r / 2;
    }
  }

  draw()
  {
    noFill();
    stroke(255);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  update()
  {
    this.position.add(this.velocity);
  }
}