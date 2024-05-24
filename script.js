// game constants and variables
let inputDir = { x: 0, y: 0 }; // Direction of the snake's movement
let snakeArr = [{ x: 13, y: 15 }]; // Initial position of the snake's Array
const foodSound = new Audio("music/food.mp3"); // Sound when food is eaten
const gameOverSound = new Audio("music/gameover.mp3"); // Sound when the game is over
const moveSound = new Audio("music/move.mp3"); // Sound when the snake moves
let speed = 2; // Game speed
let lastPaintTime = 0; // Last time the game was rendered
let food = { x: 6, y: 7 }; // Initial position of the food element
let score = 0;

// game functions
function main(ctime) {
  window.requestAnimationFrame(main); // Calls the main function repeatedly to create a game loop
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return; // If the time difference is less than the speed, return early
  }
  lastPaintTime = ctime; // Update the last paint time
  gameEngine(); // Call the game engine function to update the game state
}

function isCollide(snake) {
  // if you bump into yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if you bump into the wall
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    return true;
  }
  return false;
}

function gameEngine() {
  // part1: updating the snakeArray
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
  }

  // if you have eaten the food, increment the score and regenerate the food;
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    // means if the head of snakeArr meets the food element in x or y direction
    foodSound.play();
    score+=1;
    if(score>hiscoreval){
      hiscoreval =score;
      localStorage.getItem("hiscore",JSON.stringify(hiscoreval))
      hiscoreBox.innerHTML ="High Score:"+hiscoreval

    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    }); // Adding a new segment to the snake in the current direction
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part 2: display the snake
  const board = document.getElementById("board"); // Ensure you have a board element
  board.innerHTML = ""; // Clear the previous frame

  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y; // Set the row position of the snake segment on the grid
    snakeElement.style.gridColumnStart = e.x; // Set the column position of the snake segment on the grid
    // snakeElement.classList.add("snake");
    if (index === 0) {
      snakeElement.classList.add("head"); // Add a class for the snake's head
    }
    else{
      snakeElement.classList.add("snake");
    }
    
    board.appendChild(snakeElement);
  });

  // Display the food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Start the game loop (main logic starts from here)
let hiscore =localStorage.getItem("hiscore");
if(hiscore===null){
 hiscoreval=0;
  localStorage.getItem("hiscore",JSON.stringify(hiscoreval))
}
else{
  hiscoreval =JSON.parse(hiscore)
  hiscoreBox.innerHTML ="High Score:"+hiscore
}

window.requestAnimationFrame(main); // Start the game loop

window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
