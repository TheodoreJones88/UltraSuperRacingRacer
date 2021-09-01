const gameArea = document.querySelector(".gameArea");
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");

startScreen.addEventListener("click", start);
// This object hold the player's base score and speed
let player = { score: 0, speed: 6 };
// This object will keep track of the keys that are pressed
let keys = {
  arrowUp: false,
  arrowDown: false,
  arrowRight: false,
  arrowLeft: false,
};

// Function used to track when key is pressed down
// function keyDown(e) {
//     e.preventDefault();
//     keys[e.key]=true;
// }

// Function used to track when key is lifted
// function keyUp(e) {
//     e.preventDefault();
//     keys[e.key]=false;
// }

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach((item) => {
    if (item.y >= 750) item.y = -50;
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    document.body.addEventListener("keydown", function (event) {
      const key = event.code;
      if (key == "ArrowUp") {
        keys.arrowUp = true;
      }
      if (key == "ArrowDown") {
        keys.arrowDown = true;
      }
      if (key == "ArrowLeft") {
        keys.arrowLeft = true;
      }
      if (key == "ArrowRight") {
        keys.arrowRight = true;
      }
    });

    document.body.addEventListener("keyup", function (event) {
      const key = event.code;
      if (key == "ArrowUp") {
        keys.arrowUp = false;
      }
      if (key == "ArrowDown") {
        keys.arrowDown = false;
      }
      if (key == "ArrowLeft") {
        keys.arrowLeft = false;
      }
      if (key == "ArrowRight") {
        keys.arrowRight = false;
      }
    });

    moveLines();
    // If the an arrow key is pressed down then the car moves in that direction
    if (keys.arrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if (keys.arrowDown && player.y < road.bottom - 70) {
      player.y += player.speed;
    }
    if (keys.arrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.arrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);

    score.innerText = " score:   " + player.score;
    player.score++;
  }
}

function start() {
  // When the start screen is clicked, then it will disappear
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  // resetting score to zero
  player.score = 0;

  window.requestAnimationFrame(gamePlay);
  // create a car element
  let car = document.createElement("div");
  // give it the class of "car"
  car.setAttribute("class", "car");
  // put the car inside of the game area
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  //create road lines
  for (i = 0; i < 5; i++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = i * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }
}
