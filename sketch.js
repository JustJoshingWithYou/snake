var snake = new Snake();
var apple = new Apple();

var NORTH = 0,
	SOUTH = 1,
	WEST = 2,
	EAST = 3;

//this is so we use the oldest input of the user to change the snake's direction in draw
//otherwise, there was a discrepancy between the input and snake's update and the snake could hit itself erroneously
var moveQueue = [];

var SCREEN_SIZE = 600;
var CELL_SIZE = 25;

var START = 0,
	PLAY = 1,
	END = 2;
var gameScreen = START;

function setup() {
	createCanvas(SCREEN_SIZE, SCREEN_SIZE);
	frameRate(15);
}

function draw() {
	background(0);
	switch (gameScreen) { //switch based on the game screen
		case START: //draw start screen
			noStroke();
			textAlign(CENTER);
			fill(255);
			textSize(40);
			text("WELCOME TO SNAKE\n by Josh Katofsky", SCREEN_SIZE / 2, SCREEN_SIZE / 2 - 50);
			textSize(15);
			text("Move the snake with WASD or the arrow keys\nTry to eat the apples without running into yourself or the walls\nPress SPACE to begin", SCREEN_SIZE / 2, SCREEN_SIZE / 2 + 50);
			break;
		case PLAY:
			stroke("#FFFFFF");
			apple.display(); //draw apple
			if (moveQueue.length > 0) { //if there's a move
				snake.direction = moveQueue[0]; //use the oldest move
				moveQueue.splice(0, 1); //get that corn outta here
			}
			snake.update(apple); //updating the snake given the apple (this handles walls, touching self, and eating apples)
			snake.display(); //draw snake
			noStroke();
			textAlign(LEFT, TOP);
			fill(255);
			textSize(50);
			text(snake.length, 25, 25);
			break;
		case END: //draw end screen
			noStroke();
			textAlign(CENTER);
			textSize(50);
			text("YOU LOSE", SCREEN_SIZE / 2, SCREEN_SIZE / 2 - 50);
			textSize(20);
			text("Your score was " + snake.length + "\n Press SPACE to play again", SCREEN_SIZE / 2, SCREEN_SIZE / 2 + 50);
			break;
		default:
			break;
	}
}

//does everything needed to start the game
function startGame() {
	gameScreen = PLAY;
	snake.respawn();
	apple.respawn(snake);
}

function keyPressed() {
	if (gameScreen === START && key === " ") {
		startGame();
	} else if (gameScreen === PLAY) {
		//we're checking if the snake is either one cell long or the user's not trying to go directly backwards before we add the input to the moveQueue
		if ((key === "W" || keyCode === UP_ARROW) &&
			(snake.length === 1 || moveQueue[moveQueue.length - 1] !== SOUTH)) {
			moveQueue.push(NORTH);
		} else if ((key === "S" || keyCode === DOWN_ARROW) &&
			(snake.length === 1 || moveQueue[moveQueue.length - 1] !== NORTH)) {
			moveQueue.push(SOUTH);
		} else if ((key === "A" || keyCode === LEFT_ARROW) &&
			(snake.length === 1 || moveQueue[moveQueue.length - 1] !== EAST)) {
			moveQueue.push(WEST);
		} else if ((key === "D" || keyCode === RIGHT_ARROW) &&
			(snake.length === 1 || moveQueue[moveQueue.length - 1] !== WEST)) {
			moveQueue.push(EAST);
		}
	} else if (gameScreen === END && key === " ") {
		startGame();
	}
}

//helper functions are helpful
function getRandomLocation() {
	return CELL_SIZE * (parseInt(Math.random() * 19));
}