var redGCanvas;
var redGCanvasContext;

var pinkGCanvas;
var pinkGCanvasContext;


var initRedGCanvas = function(){
	redGCanvas = $("#redGCanvas");

	redGCanvasContext = redGCanvas[0].getContext("2d");

	pinkGCanvas = $("#pinkGCanvas");

	pinkGCanvasContext = pinkGCanvas[0].getContext("2d");

	initGhost();
}

var initGhost = function(){
		removeGhost(redGCanvasContext, redGhost);
		removeGhost(pinkGCanvasContext, pinkGhost);

		redGhost.x = circleBlock;
		redGhost.y = circleBlock;
		redGhost.direction = 1;

		pinkGhost.x = circleBlock * 10;
		pinkGhost.y = circleBlock * 8;
		pinkGhost.direction = 1;
		//removePacman();
	moveGhost(redGhost, redGCanvasContext,[pinkGhost]);
	moveGhost(pinkGhost, pinkGCanvasContext, [redGhost]);
}

var moveGhost = function(ghost, ctx, otherGhosts){	
	if(ghost.interval)
		clearInterval(ghost.interval);


	ghost.interval = setInterval(_ =>{
		
		removeGhost(ctx, ghost);
		// right
		if(ghost.direction == 1){
			if(canMoveGhost(ghost.x + circleBlock, ghost.y, otherGhosts))
				ghost.x += circleBlock;
			else
				ghost.direction= Math.floor((Math.random() * 4) + 1);
		}
	    if(ghost.direction == 2){//up
			if(canMoveGhost(ghost.x , ghost.y+ circleBlock, otherGhosts))
				ghost.y += circleBlock;
			else
				ghost.direction = Math.floor((Math.random() * 4) + 1);
		}
		 if(ghost.direction == 3){//left{
				if(canMoveGhost(ghost.x - circleBlock, ghost.y, otherGhosts))
					ghost.x -= circleBlock;
				else
					ghost.direction = Math.floor((Math.random() * 4) + 1);
		}
		 if(ghost.direction == 4){//down{
				if(canMoveGhost(ghost.x , ghost.y - circleBlock, otherGhosts))
					ghost.y -= circleBlock;
				else
					ghost.direction = Math.floor((Math.random() * 4) + 1);
		}

		drowGhost(ctx, ghost);	

		if(isEatPacman(ghost)){
			//alert("u loose by ghost")	
			decreaseLifes();
		}

	}, 150);

	
}

var removeGhost = function(ctx, ghost) { 
	ctx.clearRect( (ghost.x - 2) - ghost.size/*size*/, (ghost.y - 2) - ghost.size/*size*/, (ghost.size/*size*/ * 2) + 5,
	 (ghost.size/*size*/ * 2) + 5);
}

var drowGhost = function(ctx, ghost){
	var img = new Image();
  	img.onload = function() {
    ctx.drawImage(img, ghost.x - ghost.size/2, ghost.y- ghost.size/2, ghost.size,ghost.size);
  	};
  	img.src = ghost.src;
}

var canMoveGhost = function(x,y, ghosts){
	for(let ghost of ghosts){
		if (x == ghost.x && y == ghost.y)
			return false;
	}

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

var isEatPacman = function(ghost){
	return ghost.x == pacman.x && ghost.y == pacman.y;
}	