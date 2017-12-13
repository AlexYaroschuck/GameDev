

var canvas;
var canvasContext;

var linesAmount = 30;
var linesAmountY = 20;
var lineRowSize = (559 - 12 - 7) / linesAmount;
var circleSize = 2;
var circleBlock = 18;
var circlesArray = new Array();

var boardArray = new Array();
var canContinue = false;

var lifes = 3;

var pacman = {
	x: circleBlock * 20,
	y: circleBlock * 20,
	direction: 1,
	size: 7,
	circlesAmount : 0
}

var redGhost = {
	x: circleBlock,
	y: circleBlock,
	direction: 1,
	size: 15,
	src: "../images/red_g.png",
}

var pinkGhost = {
	x: circleBlock *10,
	y: circleBlock *8 ,
	direction: 1,
	size: 15,
	src: "../images/pink_g.gif"
}

var canvasSize = {
	width: 559,
	height: 379
}

var initCanvas = function(){
	canvas = $("#gameCanvas");
	
	canvas.width(canvasSize.width);
	canvas.height(canvasSize.height);

	canvasContext = canvas[0].getContext("2d");

	generateBoard();
}

var startGame = function(){
$("#game").show();
$("#mainPage").hide();	
pacman.circlesAmount = 0;
$("#score").text(0);

lifes = 3;

setCookie("life", lifes, 30);

$("#lifes").text(lifes);

			initCanvas();
			initBoardCanvas();
			initCirclesCanvas();
			initPacCanvas();
			initRedGCanvas();

canContinue = true;			
			
}

var generateBoard = function(){
	if(!canvasContext)
		throw("no context");

	let ctx = canvasContext;

	ctx.lineWidth = "1";
	ctx.strokeStyle = '#0000ff';

	ctx.beginPath();

	let borderWidth = 5;

	/*TODO add enters*/
	ctx.moveTo(1,1);
	ctx.lineTo(1,canvasSize.height - 1);
	ctx.lineTo(canvasSize.width - 1, canvasSize.height - 1);
	ctx.lineTo(canvasSize.width - 1, 1);
	ctx.lineTo(1, 1);

	ctx.moveTo(borderWidth,borderWidth);
	ctx.lineTo(borderWidth,canvasSize.height - borderWidth);
	ctx.lineTo(canvasSize.width - borderWidth, canvasSize.height - borderWidth);
	ctx.lineTo(canvasSize.width - borderWidth, borderWidth);
	ctx.lineTo(borderWidth, borderWidth);
	ctx.stroke();


	//'H' letter
	ctx.beginPath();
	

	ctx.stroke();


	//'O' Letter
	ctx.beginPath();
	ctx.stroke();



	ctx.closePath();
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var decreaseLifes = function(){
			lifes --;
			setCookie("life", lifes, 30);
			$("#lifes").text(lifes);

			clearInterval(pinkGhost.interval);
			clearInterval(redGhost.interval);

			

		removeGhost(redGCanvasContext, redGhost);
		removeGhost(pinkGCanvasContext, pinkGhost);
		removePacman();

		redGhost.x = circleBlock;
		redGhost.y = circleBlock;
		redGhost.direction = 1;

		pinkGhost.x = circleBlock * 10;
		pinkGhost.y = circleBlock * 8;
		pinkGhost.direction = 1;
		
		pacman.x = circleBlock *20;
		pacman.y = circleBlock * 20;
		pacman.direction = 1;

		if(lifes <= 0){			

				let topScore = getCookie("topScore");

				if(topScore){
					topScore = topScore > pacman.circlesAmount ? topScore : pacman.circlesAmount;
				}
				else{
					topScore = pacman.circlesAmount;
				}

				setCookie("topScore", topScore);

				$("#mainPge").hide();
				$("#gameOver").show();
				canContinue = false;

				pacman.circlesAmount = 0;
				return;
			}

		movePacman(1);

		initGhost();
}