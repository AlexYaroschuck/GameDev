var pacCanvas;
var pacCanvasContext;


var initPacCanvas = function(){
	pacCanvas = $("#pacCanvas");
	
	pacCanvas.width(canvasSize.width);
	pacCanvas.height(canvasSize.height);

	pacCanvasContext = pacCanvas[0].getContext("2d");

	removePacman();

	pacman.x = circleBlock *20;
	pacman.y = circleBlock * 20;
	pacman.direction = 1;
	pacman.circlesAmount = 0;

	movePacman(1);//TODO?

}

var drowPacman = function(direction){
	let ctx = pacCanvasContext;
	ctx.fillStyle = "#fff200";
	ctx.beginPath();
	
	var startAngle = 0;
	var endAngle = 2 * Math.PI;

	var lineToX = pacman.x;
	var lineToY = pacman.y;


	if (direction === 1) { 
		startAngle = (0.35 - (3 * 0.05)) * Math.PI;
		endAngle = (1.65 + (3 * 0.05)) * Math.PI;
		lineToX -= 8;
	} else if (direction === 2) { 
		startAngle = (0.85 - (3 * 0.05)) * Math.PI;
		endAngle = (0.15 + (3 * 0.05)) * Math.PI;
		lineToY -= 8;
	} else if (direction === 3) { 
		startAngle = (1.35 - (3 * 0.05)) * Math.PI;
		endAngle = (0.65 + (3 * 0.05)) * Math.PI;
		lineToX += 8;
	} else if (direction === 4) { 
		startAngle = (1.85 - (3 * 0.05)) * Math.PI;
		endAngle = (1.15 + (3 * 0.05)) * Math.PI;
		lineToY += 8;
	}
	ctx.arc(pacman.x, pacman.y, pacman.size, startAngle, endAngle, false);
	ctx.lineTo(lineToX, lineToY);
	ctx.fill();
	ctx.closePath();
}

var removePacman = function() { 
	pacCanvasContext.clearRect( (pacman.x - 2) - pacman.size/*size*/, (pacman.y - 2) - pacman.size/*size*/, (pacman.size/*size*/ * 2) + 5, (7/*size*/ * 2) + 5);
}

var movePacman = function(direction){
	removePacman();

	// right
	if(direction == 1){
		if(canMove(pacman.x + circleBlock, pacman.y))
			pacman.x += circleBlock;
	}
	else if(direction == 2){//up
		if(canMove(pacman.x , pacman.y+ circleBlock))
			pacman.y += circleBlock;
	}
	else if(direction == 3){//left{
		if(canMove(pacman.x - circleBlock, pacman.y))
			pacman.x -= circleBlock;
	}
	else if(direction == 4){//down{
		if(canMove(pacman.x , pacman.y - circleBlock))
			pacman.y -= circleBlock;
	}
	if(isloose()){
		decreaseLifes();
	}

	drowPacman(direction);
	eatCircle();
}

var canMove = function(x,y){
	for(let item of boardArray){
		let xStart = item.x1 < item.x2 ? item.x1 : item.x2;
		let yStart = item.y1 < item.y2 ? item.y1 : item.y2;

		let xEnd = item.x1 > item.x2 ? item.x1 : item.x2;
		let yEnd = item.y1 > item.y2 ? item.y1 : item.y2;

		for(let boardX = xStart; boardX <= xEnd; boardX += circleBlock){
			for(let boardY = yStart; boardY <= yEnd; boardY += circleBlock){
				if(x == boardX && y == boardY)
				{
					return false;
				}
			}
		}
	}

	if(x <= 6 || x>= canvasSize.width -6 || y <= 6 || y >= canvasSize.height - 6 )
		return false;

	return true;
}

var eatCircle = function(){
	for(let circle of circlesArray){
		if(pacman.x == circle.x && pacman.y == circle.y){
			let index = circlesArray.indexOf(circle);
			circlesArray.splice(index, 1);

			pacman.circlesAmount++;
			removeCircle(circle.x, circle.y);

			$("#score").text(pacman.circlesAmount * 10);

				if(circlesArray.length == 0){
					$("#mainPge").hide();
					$("#winPage").show();
					canContinue = false;
				}

			return;
		}
	}	
}

var isloose = function(){
	let ghostArray = [redGhost, pinkGhost];

	for(let g of ghostArray){
		if(pacman.x == g.x && pacman.y == g.y)
			return true;
	}

	return false;

}