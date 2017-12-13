var boardCanvas;
var boardCanvasContext;



var initBoardCanvas = function(){
	boardCanvas = $("#boardCanvas");
	boardArray.length = 0;
	
	boardCanvas.width(canvasSize.width);
	boardCanvas.height(canvasSize.height);

	boardCanvasContext = boardCanvas[0].getContext("2d");

	generateBoards();
}

var generateBoards = function(){
	let ctx = boardCanvasContext;

	let cb = circleBlock;	

	x1 = cb * 2;
	x2 = x1;
	y1 = cb * 2;
	y2 = cb * 10
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 29;
	x2 = x1;
	y1 = cb * 2;
	y2 = cb * 8
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 6;
	x2 = x1;
	y1 = cb * 2;
	y2 = cb * 10
	drowSquareDown(x1,y1,x2,y2, true, ctx);

	x1 = cb * 2;
	x2 = cb * 6;
	y1 = cb * 5;
	y2 = cb * 5;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 8;
	x2 = x1;
	y1 = cb * 2;
	y2 = cb * 10
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 11;
	x2 = x1;
	y1 = cb * 2;
	y2 = cb * 10
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 8;
	x2 = cb * 25;
	y1 = cb * 10;
	y2 = cb * 10;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 15;
	x2 = cb * 19;
	y1 = cb * 5;
	y2 = cb * 5;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 16;
	x2 = cb * 16;
	y1 = cb * 5;
	y2 = cb * 8;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 17;
	x2 = cb * 17;
	y1 = cb * 5;
	y2 = cb * 8;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 19;
	x2 = cb * 30;
	y1 = cb * 1;
	y2 = cb * 1;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);


	x1 = cb * 28;
	x2 = cb * 28;
	y1 = cb * 1;
	y2 = cb * 7;
	drowSquareDown(x1,y1,x2,y2, false, ctx);
	x1 = cb * 27;
	x2 = cb * 27;
	y1 = cb * 1;
	y2 = cb * 7;
	drowSquareDown(x1,y1,x2,y2, false, ctx);
	x1 = cb * 26;
	x2 = cb * 26;
	y1 = cb * 1;
	y2 = cb * 7;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 21;
	x2 = cb * 27;
	y1 = cb * 9;
	y2 = cb * 9;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 22;
	x2 = cb * 22;
	y1 = cb * 4;
	y2 = cb * 7;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 23;
	x2 = cb * 23;
	y1 = cb * 4;
	y2 = cb * 7;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 23;
	x2 = cb * 23;
	y1 = cb * 12;
	y2 = cb * 20;
	drowSquareDown(x1,y1,x2,y2, false, ctx);


	x1 = cb * 27;
	x2 = cb * 27;
	y1 = cb * 12;
	y2 = cb * 14;
	drowSquareDown(x1,y1,x2,y2, false, ctx);


	x1 = cb * 15;
	x2 = cb * 15;
	y1 = cb * 2;
	y2 = cb * 5;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 16;
	x2 = cb * 16;
	y1 = cb * 2;
	y2 = cb * 5;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 12;
	x2 = cb * 12;
	y1 = cb * 2;
	y2 = cb * 10;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 12;
	x2 = cb * 12;
	y1 = cb * 12;
	y2 = cb * 14;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 13;
	x2 = cb * 13;
	y1 = cb * 12;
	y2 = cb * 14;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 12;
	x2 = cb * 21;
	y1 = cb * 18;
	y2 = cb * 18;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 1;
	x2 = cb * 9;
	y1 = cb * 18;
	y2 = cb * 18;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 1;
	x2 = cb * 9;
	y1 = cb * 19;
	y2 = cb * 19;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 2;
	x2 = cb * 9;
	y1 = cb * 14;
	y2 = cb * 14;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 1;
	x2 = cb * 9;
	y1 = cb * 17;
	y2 = cb * 17;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 2;
	x2 = cb * 6;
	y1 = cb * 12;
	y2 = cb * 12;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 2;
	x2 = cb * 9;
	y1 = cb * 13;
	y2 = cb * 13;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);



	x1 = cb * 26;
	x2 = cb * 29;
	y1 = cb * 16;
	y2 = cb * 16;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 26;
	x2 = cb * 26;
	y1 = cb * 16;
	y2 = cb * 19;
	drowSquareDown(x1,y1,x2,y2, false, ctx);


	x1 = cb * 29;
	x2 = cb * 29;
	y1 = cb * 19;
	y2 = cb * 20;
	drowSquareDown(x1,y1,x2,y2, false, ctx);



	x1 = cb * 15;
	x2 = cb * 15;
	y1 = cb * 11;
	y2 = cb * 13;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 16;
	x2 = cb * 21;
	y1 = cb * 15;
	y2 = cb * 15;
	drowSquareRigth(x1,y1,x2,y2, false, ctx);

	x1 = cb * 21;
	x2 = cb * 21;
	y1 = cb * 11;
	y2 = cb * 13;
	drowSquareDown(x1,y1,x2,y2, false, ctx);

	x1 = cb * 18;
	x2 = cb * 18;
	y1 = cb * 13;
	y2 = cb * 16;
	drowSquareDown(x1,y1,x2,y2, false, ctx);


	x1 = cb * 11;
	x2 = cb * 11;
	y1 = cb * 16;
	y2 = cb * 18;
	drowSquareDown(x1,y1,x2,y2, false, ctx);
	x1 = cb * 12;
	x2 = cb * 12;
	y1 = cb * 16;
	y2 = cb * 18;
	drowSquareDown(x1,y1,x2,y2, false, ctx);
	x1 = cb * 13;
	x2 = cb * 13;
	y1 = cb * 16;
	y2 = cb * 18;
	drowSquareDown(x1,y1,x2,y2, false, ctx);
}

var drowSquareDown = function(x1,y1,x2,y2, isLeft, ctx){
	//TODO uncoment this
	//ctx.lineWidth = "4";
	ctx.lineWidth = "1";
	ctx.strokeStyle = 'seagreen';
	ctx.fillStyle = "seagreen";

	let biggerY = y1 > y2 ? y1 : y2;
	let lowwerY = y1 > y2 ? y2 : y1;
	let diff = biggerY - lowwerY;

	let statrX = isLeft ? x1 - circleBlock : x1;
	let startY = y1;

	let offsetRigth = isLeft ? -circleBlock : circleBlock;

	ctx.beginPath();
	drowLineTransform(x1,y1, x2,y2, ctx);

	x1 = x2;
	y1 = y2;

	x2 = x2 + offsetRigth;
	y2 = y2;

	drowLineTransform(x1,y1, x2,y2, ctx);

	x1 = x2;
	y1 = y2;

	x2 = x2;
	y2 = y2 - diff;

	drowLineTransform(x1,y1, x2,y2, ctx);

	x1 = x2;
	y1 = y2;

	x2 = x2 - offsetRigth;
	y2 = y2;

	drowLineTransform(x1,y1, x2,y2, ctx);

	ctx.fillRect(statrX,startY, circleBlock, diff);
	ctx.stroke();

	ctx.closePath();
}

var drowSquareRigth = function(x1,y1,x2,y2, isUp, ctx){
	//TODO uncoment this
	ctx.lineWidth = "1";
	//ctx.lineWidth = "1";
	ctx.strokeStyle = 'seagreen';
	ctx.fillStyle = "seagreen";

	let biggerX = x1 > x2 ? x1 : x2;
	let lowerX = x1 > x2 ? x2 : x1;
	let diff = biggerX - lowerX;

	let statrX = x1;
	let startY = isUp ? y1 - circleBlock : y1;

	let offsetDown = isUp ? -circleBlock : circleBlock;

	ctx.beginPath();
	drowLineTransform(x1,y1, x2,y2, ctx);

	x1 = x2;
	y1 = y2;

	x2 = x2 ;
	y2 = y2 + offsetDown;

	drowLineTransform(x1,y1, x2,y2, ctx);

	x1 = x2;
	y1 = y2;

	x2 = x2 - diff;
	y2 = y2 ;

	drowLineTransform(x1,y1, x2,y2, ctx);

	x1 = x2;
	y1 = y2;

	x2 = x2 ;
	y2 = y2 - offsetDown;

	drowLineTransform(x1,y1, x2,y2, ctx);

	ctx.fillRect(statrX,startY, diff, circleBlock);
	ctx.stroke();

	ctx.closePath();
}

var drowLineTransform = function(x1,y1, x2, y2, ctx){
	let lx1 = x1;
	let lx2 = x2;

	let ly1 = y1;
	let ly2 = y2;

	if(x1 != x2){
	//	lx1 = x1 < x2 ? x1 - 2 : x1 + 2;
	//	lx2 = x2 < x1 ? x2 - 2 : x2 + 2;
	}

	if(y1 != y2){
	//	ly1 = y1 < y2 ? y1 - 2 : y1 + 2;
	//	ly2 = y2 < y1 ? y2 - 2 : y2 + 2;
	}	

	ctx.moveTo(lx1,ly1);
	ctx.lineTo(lx2,ly2);
	//ctx.stroke();

	boardArray.push({
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2
	})
}