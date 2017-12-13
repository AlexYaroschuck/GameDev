
var canvas;
var canvasContext;

var tetrisCanvas;
var tetrisCanvasContext;

var currentBlockCanvas;
var currentBlockCanvasContext;
var blockSize = 30;

var linesCount = 550 / blockSize;
var columnsCount = 300 / blockSize;
var currentShape =  new Array();

var shapesArray = new Array();
var nextShape = 1;

var currentType = 'rect';
var isUp = false;

var currentlevel = 1;
var currentScore = 10;

var interval;
var isOnPause = false;
var isGameOverFlag = false;

var initCanvas = function () {
    canvas = $("#gameCanvas");
    canvasContext = canvas[0].getContext("2d");

    tetrisCanvas = $("#tetrisCanvas");
    tetrisCanvasContext = tetrisCanvas[0].getContext("2d");

    currentBlockCanvas = $("#currentBlockCanvas");
    currentBlockCanvasContext = currentBlockCanvas[0].getContext("2d");

    generateBoard();
}

var canvasSize = {
    width: 550,
    height: 550
}

var generateBoard = function () {
    if (!canvasContext)
        throw("no context");

    let ctx = canvasContext;

    ctx.lineWidth = "1";
    ctx.strokeStyle = 'black';

    ctx.beginPath();

    let borderWidth = 5;

    ctx.rect(1,1, 250 - 15, 550 -1);
    ctx.rect(6,6, 250 - 25, 550 - 11);

    ctx.stroke();

    ctx.closePath();

    generateTetrisBoard();
    generateGameBoard();
}

var generateGameBoard = function(){
	 let ctx = canvasContext;
	 ctx.beginPath();

    let borderWidth = 5;

    ctx.rect(45,100, 150, 150);

    ctx.stroke();

    ctx.closePath();
}

var generateTetrisBoard = function () {
    if (!tetrisCanvasContext)
        throw("no context");

    let ctx = tetrisCanvasContext;

    ctx.lineWidth = "2";
    ctx.strokeStyle = 'black';

    ctx.beginPath();

    let borderWidth = 5;

   // ctx.rect(1,1, blockSize * columnsCount -1, blockSize * linesCount -1 );


    ctx.stroke();

    ctx.closePath();
    generateSquare(blockSize * 4, 0, currentBlockCanvasContext);
    moveCurrentShape('rect');
    drowNextShape(1);
}

var generateSquare = function (x, y, ctx) {
    currentShape = [];
    ctx.beginPath();

    let color = 'yellow';

 	ctx.fillStyle = color;

 	currentShape = getSquareArray(x,y, color, blockSize);    

 	 for(let sh of currentShape){  
		ctx.rect(sh.x, sh.y, blockSize, blockSize);
    } 

    ctx.fill();	   

    drowCurrentShapeBorders(ctx);
};

var getSquareArray = function(x, y, color,blockSize1 = blockSize){
    let arr = [];
    
    arr.push({x: x, y: y, color: color});
    arr.push({x: x + blockSize1, y: y,color});
    arr.push({x: x, y: y + blockSize1, color});
    arr.push({x: x + blockSize1, y: y + blockSize1,color});    
    
    return arr;
}

var drowCurrentShapeBorders = function(ctx){
	for(let ch of currentShape){
		 drawBorder(ch.x,ch.y, ctx);
	}
}

var drawBorder = function(x, y, ctx, thickness = 1){
  	ctx.fillStyle='black';

  	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x + blockSize,y);
	ctx.lineTo(x + blockSize,y + blockSize);
	ctx.lineTo(x ,y + blockSize);
	ctx.lineTo(x ,y );
 	ctx.stroke();
 	ctx.closePath();
}

var generateRussianG = function (x, y, ctx, rotate = false, tempArrParam = null) {
    
    currentShape = [];
    ctx.beginPath();

	ctx.fillStyle = 'coral';
	let color = 'coral'
    
    let arr = getRussianGArray(x, y,color, rotate);
    
    for(let ar of arr){
        currentShape.push(ar);
    }
   
    for(let sh of currentShape){  
		ctx.rect(sh.x, sh.y, blockSize, blockSize);
    } 
    
	ctx.fill();
    
    drowCurrentShapeBorders(ctx);
};

var getRussianGArray = function(x, y, color, rotate = false, blockSize1 = blockSize){
    let arr = [];
    
    if(!rotate){
         arr.push({x: x, y: y,color});
         arr.push({x: x + blockSize1, y: y,color});
         arr.push({x: x, y: y + blockSize1,color});
         arr.push({x: x, y: y + blockSize1 * 2,color});    
    }
    else
    {
         arr.push({x: x, y: y, color});
         arr.push({x: x , y: y + blockSize1, color});
         arr.push({x: x+ blockSize1 , y: y + blockSize1, color});
         arr.push({x: x+ blockSize1 * 2, y: y + blockSize1, color});    
    }
    
    return arr;
}

var generateSmallG = function (x, y, ctx, isHorizontal = false) {
    currentShape = [];
    ctx.beginPath();
	let color = 'orange'
	ctx.fillStyle = color;

	currentShape = getSmallGArray(x, y, ctx, isHorizontal, color);

    for(let sh of currentShape){  
		ctx.rect(sh.x, sh.y, blockSize, blockSize);
    } 
    ctx.fill();     
   
    drowCurrentShapeBorders(ctx);
};

var getSmallGArray = function(x, y, ctx, isHorizontal, color){
	let arr = [];
	if(isHorizontal){
		arr.push({x: x, y: y,color});
    	arr.push({x: x+ blockSize, y: y,color});
    	arr.push({x: x+ blockSize , y: y+ blockSize,color});
    	arr.push({x: x+ blockSize * 2, y: y+ blockSize,color});  
	}
	else{
		arr.push({x: x, y: y, color});
    	arr.push({x: x, y: y + blockSize, color});
    	arr.push({x: x + blockSize, y: y + blockSize, color});
    	arr.push({x: x + blockSize, y: y + blockSize * 2, color});  
	} 

	return arr;
}

var generateLine = function(x,y, ctx, isLong = true, isHorizontal = false){
	currentShape = [];
    ctx.beginPath();

    ctx.rect(x, y, blockSize, blockSize);
    let color = isLong ? 'lightgreen' : 'darkgreen';

    ctx.fillStyle = color;

	currentShape = getLineArray(x,y, ctx, color, isLong, isHorizontal);

	for(let sh of currentShape)
		ctx.rect(sh.x, sh.y, blockSize, blockSize);

    ctx.fill();

    drowCurrentShapeBorders(ctx);
}

var getLineArray = function(x,y, ctx,color, isLong = true, isHorizontal = false){
	let arr = [];

	if(isHorizontal){
		arr.push({x: x, y: y, color: color});	
   		 arr.push({x: x+ blockSize , y: y, color: color});
   		 arr.push({x: x+ blockSize * 2, y: y , color: color});

    if(isLong)
    	arr.push({x: x + blockSize * 3, y: y, color: color});
	}
	else{
		 arr.push({x: x, y: y, color: color});
   		 arr.push({x: x , y: y+ blockSize, color: color});
   		 arr.push({x: x, y: y + blockSize * 2, color: color});

    	if(isLong)
    		arr.push({x: x, y: y + blockSize * 3, color: color});
	}

	return arr;
}

var moveCurrentShape = function (type) {
    interval = setInterval(x => {
        clearCurrentShapeCanvas();
        if (type === 'rect') 
            generateSquare(currentShape[0].x, currentShape[0].y + blockSize, currentBlockCanvasContext);
        else
        if (type === 'gWord') 
            generateRussianG(currentShape[0].x, currentShape[0].y + blockSize, currentBlockCanvasContext, isUp);
        else
        if(type.indexOf("3line") != -1)
            generateLine(currentShape[0].x, currentShape[0].y+ blockSize, currentBlockCanvasContext,false,  isUp);
        else
        if(type.indexOf("4line") != -1)
            generateLine(currentShape[0].x, currentShape[0].y+ blockSize, currentBlockCanvasContext,true,  isUp);
        else  
        if(type.indexOf("smallG") != -1)
            generateSmallG(currentShape[0].x, currentShape[0].y+ blockSize, currentBlockCanvasContext, isUp);       

        stopMoving(interval, type);
    }, 1000 - currentlevel * 100);

};

var clearCurrentShapeCanvas = function () {
    currentBlockCanvasContext.clearRect(0, 0, blockSize * columnsCount, blockSize * linesCount);
};

var stopMoving = function (interval, type) {
    for (let shape of currentShape) {
        if (shape.y + blockSize >= 550 - 10 || !canMove(shape)) {

            for (let shp of currentShape) {
                shapesArray.push(shp);
            }

            clearInterval(interval);
            clearCurrentShapeCanvas();

            if (type === 'rect') {
                generateSquare(currentShape[0].x, currentShape[0].y, tetrisCanvasContext);
            }else
            if (type === 'gWord') {
                generateRussianG(currentShape[0].x, currentShape[0].y, tetrisCanvasContext, isUp);
            }else
            if(type.indexOf("3line") != -1){
            	generateLine(currentShape[0].x, currentShape[0].y, tetrisCanvasContext, false , isUp);
            }
            if(type.indexOf("4line") != -1){
            	generateLine(currentShape[0].x, currentShape[0].y, tetrisCanvasContext, true, isUp);
            }
            else
            if(type.indexOf("smallG")!= -1)
            	generateSmallG(currentShape[0].x, currentShape[0].y, tetrisCanvasContext, isUp);
            

           completeLine();
           isUp = false;
           generateNewShape();
            return;
        }
    }
};

var completeLine = function(){
	let amount = 0;

	let linesToDelete = [];

	for(let lineY = 1; lineY <= linesCount; lineY++){
		let temp = []; 

		for(let s of shapesArray){
			if(s.y != lineY * blockSize)
				continue;

			for(let lineX = 0; lineX <= columnsCount; lineX++){
				if(s.x != lineX * blockSize)
					continue;

				temp.push(s);
			}
		}

		if(temp.length >= columnsCount){
			let y = 0;

			for(let it of temp){
				y = it.y;
				let index = shapesArray.indexOf(it);
				shapesArray.splice(index,1);
			}
			moveBlocksDown(y);			
			increaseScore();
		}
	}
}

var increaseScore = function(isFigure = false){
	currentScore += (isFigure ? 10 : 100);
	$("#score").text(currentScore);	

	currentlevel = Math.floor(currentScore / 500) + 1;
	$("#level").text(currentlevel);
	
}

var moveBlocksDown = function(y){
	tetrisCanvasContext.clearRect(0,0, blockSize * columnsCount, blockSize * linesCount)

	for(let sh of shapesArray){
		if(sh.y <= y)
			sh.y += blockSize;
		
		tetrisCanvasContext.beginPath();
		tetrisCanvasContext.fillStyle = sh.color;
		tetrisCanvasContext.rect(sh.x, sh.y, blockSize, blockSize);
		tetrisCanvasContext.fill();
		drawBorder(sh.x, sh.y, tetrisCanvasContext);
		
		tetrisCanvasContext.closePath();
	}
}

var canMove = function (shape) {
    for (let shapes of shapesArray) {
        if (shape.y + blockSize >= shapes.y && shape.x == shapes.x) {
            return false;
        }      
    }

    return true;
};

var canMoveWhenUp = function (currenArray) {
    for (let shapes of shapesArray) {
        for(let shape of currenArray){
            if (shape.y + blockSize >= shapes.y && shape.x == shapes.x) {
            	return false;
            }

            if(shape.x < 0 || shape.x >= blockSize*columnsCount || shape.y >= blockSize * linesCount){
            		return false;
            }    
        }          
    }

    return true;
};

var canUserMove = function(shape, direction){
	if(shape.x + blockSize >= blockSize * columnsCount && direction == 'r')
		return false;

	if(shape.x <= 5 && direction == 'l')
		return false;

	if(direction = 'd' && shape.y + blockSize*2 >= 550 - 10)
			return false;

	for(let sp of shapesArray){
		if(direction == 'r' && shape.x + blockSize  == sp.x && sp.y == shape.y )
			return false;

		if(direction == 'l' && (shape.x - blockSize  == sp.x  ) && sp.y == shape.y )
			return false;

		if(direction = 'd' && shape.y + blockSize*2 == sp.y && sp.x == shape.x)
			return false;
	}

	return true;
}

var moveUp = function(){
    if(currentType == 'rect')
        return;  

    if(!canMoveUp())
    	return;

    clearCurrentShapeCanvas();

    if(currentType == 'gWord'){
        isUp = !isUp;
        generateRussianG(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext, isUp);
    }
    else
    if(currentType.indexOf('4line') != -1 ){
    	isUp = !isUp;
    	generateLine(currentShape[0].x,currentShape[0].y, currentBlockCanvasContext,  true, isUp);
    }
    else
    if(currentType.indexOf('3line') != -1 ){
    	isUp = !isUp;
    	generateLine(currentShape[0].x,currentShape[0].y, currentBlockCanvasContext, false, isUp);
    }
    else
    if(currentType.indexOf('smallG') != -1 ){
    	isUp = !isUp;
    	generateSmallG(currentShape[0].x,currentShape[0].y, currentBlockCanvasContext, isUp);
    }
    
};

var canMoveUp = function(){
    if(currentType == "gWord")
         return canMoveWhenUp(getRussianGArray(currentShape[0].x, currentShape[0].y, 'yellow', !isUp));   

    if(currentType.indexOf("3line") != -1 )
    	return canMoveWhenUp(getLineArray(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext,"any", false, !isUp));
    
	if(currentType.indexOf("4line") != -1 ){
    	return canMoveWhenUp(getLineArray(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext,"any", true, !isUp));
    }
    if(currentType == "gWord")
        return canMoveWhenUp(getSmallGArray(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext, 'yellow', !isUp));  
    
    return true;
};

var drowNextShape = function(nextShape){
	let arr = [];
	let color = "yellow"; 

	canvasContext.clearRect(46, 101, 149, 149);

	let blockSize1 = blockSize / 3;

	if(nextShape == 1){
		 arr = getSquareArray(90, 140, currentBlockCanvasContext);
	}else if(nextShape == 2){
		arr = getRussianGArray(70, 130, color);
	}else if(nextShape == 3 || nextShape == 5){
		arr = getLineArray(100, 130, currentBlockCanvasContext,color, false, isUp, blockSize1);
	}else if(nextShape == 4 || nextShape == 6){
		arr = getLineArray(100, 100 +  15, currentBlockCanvasContext,color, true, isUp, blockSize1);
	}else if(nextShape == 7 || nextShape == 8)
		arr = getSmallGArray(70, 130, currentBlockCanvasContext,color, isUp, blockSize1);

	canvasContext.beginPath();
	for(let item of arr){
		canvasContext.rect(item.x, item.y, blockSize, blockSize );
	}
	canvasContext.fillStyle = "yellow";
	canvasContext.fill();

	for(let item of arr){
		drawBorder(item.x, item.y, canvasContext)
	}
}

var generateNewShape = function(){	
	if(isGameOver())
	{
		isGameOverFlag = true;
		pauseGame();
		shapesArray = [];
		$(".gameOver").show();

		return;
	}	

	increaseScore(true);

	let randomNewShape = Math.floor((Math.random() * 8) + 1);

	let rand = nextShape;
	nextShape = randomNewShape;
	drowNextShape(nextShape);

	if(rand == 1){
		 generateSquare(blockSize * 4, 0, currentBlockCanvasContext);
   		 moveCurrentShape('rect');
        currentType ='rect';
	}else if(rand == 2){
		generateRussianG(blockSize * 4, 0, currentBlockCanvasContext);
	 	moveCurrentShape('gWord');
        currentType = 'gWord';
	}else if(rand == 3){
		generateLine(blockSize * 4, 0, currentBlockCanvasContext, false, false);
		moveCurrentShape('3line');
        currentType = '3line';
        isUp = false;
	}else if(rand == 4){
		generateLine(blockSize * 4, 0, currentBlockCanvasContext, true, false);
		moveCurrentShape('4line');
        currentType = '4line';
        isUp = false;
	}else if(rand == 5){
		generateLine(blockSize * 4, 0, currentBlockCanvasContext, false, true);
		moveCurrentShape('3lineHorizontal');
        currentType ='3lineHorizontal';
         isUp = true;
	}else if(rand == 6){
		generateLine(blockSize * 4, 0, currentBlockCanvasContext, true, true);
		moveCurrentShape('4lineHorizontal');
        currentType='4lineHorizontal';
        isUp = true;
	}else if(rand == 7){
		generateSmallG(blockSize * 4, 0, currentBlockCanvasContext, true);
		moveCurrentShape('smallGHorizontal');
        currentType='smallGHorizontal';
        isUp = true;
	}else if(rand == 8){
		generateSmallG(blockSize * 4, 0, currentBlockCanvasContext, false);
		moveCurrentShape('smallG');
        currentType='smallG';
        isUp = false;
	}

	return;
}

var isGameOver = function(){
	for(let item of shapesArray){
		if(item.y <= 30)
			return true;
	}

	return false;
}

var pauseGame = function(){
	clearInterval(interval);
	isOnPause = true;

	if(isGameOverFlag){
		$("#pauseText").text("restart");
	}
	else{
		$("#pauseText").text("resume");
	}	
}

var resumeGame = function(){

	if(isGameOverFlag)
	{
		isGameOverFlag = false;
		clearCurrentShapeCanvas();
		tetrisCanvasContext.clearRect(0, 0, blockSize * columnsCount, blockSize * linesCount);
		currentShape = [];
		clearInterval(interval);

 		currentScore =0;
		$("#score").text(currentScore);	

		currentlevel = 1;
		$("#level").text(currentlevel);	

		$(".gameOver").hide();

		 generateSquare(blockSize * 4, 0, currentBlockCanvasContext);
    	 moveCurrentShape('rect');
    	 drowNextShape(1);    	

	}else{
		moveCurrentShape(currentType);		
	}	

	$("#pauseText").text("pause");
	isOnPause = false;
	
}

var redrowDown = function(){
let type = currentType;

		clearCurrentShapeCanvas();
        if (type === 'rect') 
            generateSquare(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext);
        else
        if (type === 'gWord') 
            generateRussianG(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext, isUp);
        else
        if(type.indexOf("3line") != -1)
            generateLine(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext,false,  isUp);
        else
        if(type.indexOf("4line") != -1)
            generateLine(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext,true,  isUp);
        else  
        if(type.indexOf("smallG") != -1)
            generateSmallG(currentShape[0].x, currentShape[0].y, currentBlockCanvasContext, isUp);   
}