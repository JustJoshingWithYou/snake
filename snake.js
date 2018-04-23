function Snake() { //object for the snake
	this.respawn = function() {
		this.length = 1;
		this.xs = [getRandomLocation()];
		this.ys = [getRandomLocation()];
		this.direction = null;
		this.amountToGrow = 0;
	}
	this.display = function() { //loop through every cell an draw it
		fill("#a1deff");
		for (var i = 0; i < this.length; i++) {
			rect(this.xs[i], this.ys[i], CELL_SIZE, CELL_SIZE);
		}
	}
	this.isTouchingApple = function(apple) {
		return (this.xs[0] === apple.x) && (this.ys[0] === apple.y); //if the apple and the 0'th cell are in the same location
	}
	this.isTouchingSelf = function() {
		if (this.length <= 2) { //can't be touching yourself if you're two cells or less
			return false;
		}
		for (var i = 1; i < this.length; i++) { //if any cell is in the same location as the 0'th
			if ((this.xs[0] === this.xs[i]) && (this.ys[0] === this.ys[i])) {
				return true;
			}
		}
		return false;
	}
	this.isTouchingWall = function() {
		return (this.xs[0] >= SCREEN_SIZE || this.xs[0] < 0 || this.ys[0] >= SCREEN_SIZE || this.ys[0] < 0); //if the 0'th cell is past any of the bounds of the screen
	}
	this.update = function(apple) {

		//we have to keep track of some locations before we move the snake

		//keep track of the location of the first cell, used to make the snake move
		var tempXs = [this.xs[0], null];
		var tempYs = [this.ys[0], null];

		//the spot of the last cell, incase we need to grow
		var oldLastX = this.xs[this.xs.length - 1];
		var oldLastY = this.ys[this.ys.length - 1];

		//move the first cell based on the direction
		switch (this.direction) {
			case NORTH:
				this.ys[0] -= CELL_SIZE;
				break;
			case SOUTH:
				this.ys[0] += CELL_SIZE;
				break;
			case WEST:
				this.xs[0] -= CELL_SIZE;
				break;
			case EAST:
				this.xs[0] += CELL_SIZE;
				break;
			default:
				break;
		}

		//go along the rest of the cells, and set them all to the old location of the one infront of them
		//(this was why we kept track of the 0th cell before we moved it)
		for (var i = 1; i < this.length; i++) {
			tempXs[1] = this.xs[i];
			tempYs[1] = this.ys[i];
			this.xs[i] = tempXs[0];
			this.ys[i] = tempYs[0];
			tempXs[0] = tempXs[1];
			tempYs[0] = tempYs[1];
		}

		//if we have to grow, add a cell to the old location of the last cell
		if (this.amountToGrow > 0) {
			this.xs.push(oldLastX);
			this.ys.push(oldLastY);
			this.length++;
			this.amountToGrow--;
		}

		//finish the game if we're touching a wall or ourselves
		if (this.isTouchingWall() || this.isTouchingSelf()) {
			gameScreen = END;
		}
		//if we're touching the apple, we have to grow on the next call of this function
		if (this.isTouchingApple(apple)) {
			this.amountToGrow++;
			apple.respawn(this); //also, respawn the apple given the current state of the snake
		}
	}
}