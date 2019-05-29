let leftPlayers;
let rightPlayers;
let savedLeftPlayers;
let savedRightPlayers;
let balls;
const TOTAL = 100;

let generation;

function initSketch() {
  generation++;
  console.log('Next Generation')

  let bestLeftPlayer;
  let bestRightPlayer;
  balls = [];

  for (let left of savedLeftPlayers) {
    if (!bestLeftPlayer || bestLeftPlayer.score < left.score) {
      bestLeftPlayer = left;
    }
  }

  for (let right of savedRightPlayers) {
    if (!bestRightPlayer || bestRightPlayer.score < right.score) {
      bestRightPlayer = right;
    }
  }

  leftPlayers = [];
  rightPlayers = [];
  savedLeftPlayers = [];
  savedRightPlayers = [];

  for (let i = 0; i < TOTAL; i++) {
    if (bestLeftPlayer) {
      leftPlayers[i] = new Racket(true, true, bestLeftPlayer.clone());
    } else {
      leftPlayers[i] = new Racket(true, true);
    }

    if (bestRightPlayer) {
      rightPlayers[i] = new Racket(false, true, bestRightPlayer.clone());
    } else {
      rightPlayers[i] = new Racket(false, true);
    }

    balls[i] = new Ball();
  }

  // loop();
  // noLoop();
  // setTimeout(loop, 500);
}

function setup() {
  createCanvas(700, 500);
  tf.setBackend('cpu');
  // noLoop();

  leftPlayers = [];
  rightPlayers = [];
  savedLeftPlayers = [];
  savedRightPlayers = [];
  balls = [];
  generation = 0;

  initSketch();
}

function draw() {
  background(0);

  // if (keyIsDown(UP_ARROW)) {
  //   player1.up();
  //   // player2.up();
  // } else if (keyIsDown(DOWN_ARROW)) {
  //   player1.down();
  //   // player2.down();
  // }

  for (let i = 0; i < leftPlayers.length; i++) {
    leftPlayers[i].score++;
    rightPlayers[i].score++;

    leftPlayers[i].think(balls[i]);
    rightPlayers[i].think(balls[i]);

    leftPlayers[i].update();
    rightPlayers[i].update();
    balls[i].update();

    if (balls[i].direction[0] === -1 && leftPlayers[i].missed(balls[i])) {
      // fill(255);
      // textSize(32);
      // textAlign(CENTER, CENTER);
      // text('Player 2 wins', width / 2, height / 2)
      // noLoop();
      // initSketch();
      savedLeftPlayers.push(leftPlayers[i]);
      savedRightPlayers.push(rightPlayers[i]);
      leftPlayers.splice(i, 1);
      rightPlayers.splice(i, 1);
      balls.splice(i, 1);
    } else if (
      balls[i].direction[0] === 1 &&
      rightPlayers[i].missed(balls[i])
    ) {
      // fill(255);
      // textSize(32);
      // textAlign(CENTER, CENTER);
      // text('Player 1 wins', width / 2, height / 2)
      // noLoop();
      // initSketch();
      savedLeftPlayers.push(leftPlayers[i]);
      savedRightPlayers.push(rightPlayers[i]);
      leftPlayers.splice(i, 1);
      rightPlayers.splice(i, 1);
      balls.splice(i, 1);
    }
  }

  // console.log(leftPlayers.length + ' ' + rightPlayers.length)

  if (leftPlayers.length === 0 && rightPlayers.length === 0) {
    // noLoop();
    initSketch();
  }
}
