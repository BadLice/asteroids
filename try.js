var tr;

function setup()
{
  createCanvas(600, 600);

  tr = new Try(300, 300, 50, 90);
}

function draw()
{
  background(0)
  tr.draw();
  tr.update();

}

class Try
{
  constructor(x, y, r, angle)
  {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.friction = createVector(0, 0);
    this.maxForce = 0.15;
    this.maxSpeed = 10;
    // this.x = x;
    // this.y = y;
    this.r = r;
    this.angle = angle; //in degrees
    this.rotationSpeed = 3;
    this.life = 100;
    this.score = 0;

    this.bulletLease = 0.3; //in seconds
    this.timex = 0;
  }



  draw()
  {
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
    var target = createVector(0, 0);
    var desired = createVector(0, 0);
    var steer = createVector(0, 0);
    this.friction = this.velocity.copy();
    this.friction.mult(-0.02);
    //PVector steer = PVector.sub(desired,velocity);

    if (mouseIsPressed)
    {
      // this.acceleration.add(1, 0);
      target = p5.Vector.add(this.position, createVector(100 * cos(radians(this.angle - 90)), 100 * sin(radians(this.angle - 90))));
      desired = p5.Vector.sub(target, this.position);

      stroke(255, 255, 255)
      point(desired.x, desired.y);
      steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);

      //y=x*cotg(angle)
      //cotg(angle)=y/x
      //arccotg((y2-y1)/(x2-x1));

    }
    this.acceleration.add(steer);
    this.velocity.add(this.acceleration);
    this.velocity.add(this.friction);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);


    this.angle = degrees(atan2(this.position.y - mouseY, this.position.x - mouseX)) - 90;
    // this.angle = degrees(atan((this.position.y - mouseY) / (this.position.x - mouseX))) + 90; va bene ma funziona solo per (0,PI), va modificata e diventa una atan2 per cui è inutile usarla così


  }
}

// function arcctg(x)
// {
//   return Math.PI / 2 - Math.atan(x);
// }