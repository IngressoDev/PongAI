class Ball {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.speed = 6;

    this.x = width / 2 - this.width / 2;
    this.y = height / 2 - this.height / 2;

    this.direction = [random([-1, 1]), 0];
  }

  changeDirection() {
    this.direction[0] *= -1;
    this.direction[1] = random(-1, 1);
  }

  update() {
    if (this.y <= 0 || this.y + this.height >= height) {
      this.direction[1] *= -1;
    }
    this.x += this.speed * this.direction[0];
    this.y += this.speed * this.direction[1];

    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}
