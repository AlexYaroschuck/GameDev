
var circleCanvas;
var circleCanvasContext;

var initCirclesCanvas = function(){
	circleCanvas = $("#circleCanvas");
	circlesArray.length = 0;
	
	circleCanvas.width(canvasSize.width);
	circleCanvas.height(canvasSize.height);

	circleCanvasContext = circleCanvas[0].getContext("2d");

	generateCircles();
}

var generateCircles = function(){
	let ctx = circleCanvasContext;

	ctx.fillStyle = "#dca5be";

	for(let y = 1; y <= linesAmountY; y++){
		for(let x = 1; x <= linesAmount; x++){

			let realX = x * lineRowSize;
			let realY = lineRowSize * y;

			if(!canCreateCircle(realX,realY))
				continue;

			ctx.beginPath();
			ctx.moveTo(realX, realY);

			ctx.arc(realX, realY, circleSize  , 0, 4 * Math.PI, false);
			ctx.fill();
			ctx.closePath();

			circlesArray.push({
				x: realX,
				y: realY,
			});
		}
	}
}

var canCreateCircle = function(x,y){
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

	return true;
}

var removeCircle = function(x,y) { 
	circleCanvasContext.clearRect( (x - 2) - 2/*size*/, (y - 2) - 2, (2 * 2) + 5, (2 * 2) + 5);
}


