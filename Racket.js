class Racket {
  constructor(left, createAi, brainWeights) {
    this.width = 5;
    this.height = 50;
    this.speed = 5;
    this.y = height / 2 - this.height / 2;
    left ? (this.x = 5) : (this.x = width - this.width - 5);
    this.left = left;
    this.score = 0;

    if (createAi) {
      this.brain = new NeuronalNetwork(4, 8, 2);

      if (brainWeights) {
        if (random([true, false])) {
          this.brain.setWeights(brainWeights);
        } else {
          this.brain.setWeightsMutated(brainWeights);
        }
      }
    }
  }

  clone() {
    return this.brain.clone();
  }

  think(ball) {
    const inputs = [];
    inputs[0] = this.x / width; // racket x position
    inputs[1] = this.y / height; // racket y position
    inputs[2] = ball.x / width; // ball x position
    inputs[3] = ball.y / height; // ball y position

    const predictions = this.brain.predict(inputs);

    // console.log(predictions);

    if (predictions[0] > predictions[1]) {
      this.up();
    } else {
      this.down();
    }
  }

  missed(ball) {
    if (this.left) {
      if (ball.x > this.x + this.width) {
        return false;
      } else if (
        ball.x <= this.x + this.width &&
        ball.y + ball.height >= this.y &&
        ball.y < this.y + this.height
      ) {
        ball.changeDirection();
        this.score++;
        return false;
      } else {
        return true;
      }
    } else {
      if (ball.x + ball.width < this.x) {
        return false;
      } else if (
        ball.x + ball.width >= this.x &&
        ball.y + ball.height >= this.y &&
        ball.y < this.y + this.height
      ) {
        ball.changeDirection();
        this.score++;
        return false;
      } else {
        return true;
      }
    }
  }

  up() {
    if (this.y - this.speed >= 0) {
      this.y -= this.speed;
    }
  }

  down() {
    if (this.y + this.height + this.speed <= height) {
      this.y += this.speed;
    }
  }

  update() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}
