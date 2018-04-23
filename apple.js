function Apple() { //object for the apple
	this.respawn = function(snake) {
		do {
			this.x = getRandomLocation();
			this.y = getRandomLocation();
		} while ((snake.xs.includes(this.x) && snake.ys.includes(this.y)));
		//run the loop while the location of the apple overlaps with the snake's - we can't have that
	}
	this.display = function() {
		fill("#FF0000");
		rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
	}
}