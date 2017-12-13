
var canvas;
var canvasContext;

var itemArray = [];

var rowsCount = 550 / 50;
var columnsCount = 550 / 50;

var blockSize = 50;

var moves = 32;

var gemsToWin = [{
    value: 55,
    current:0,
    name:"gem1"
},
{
    value: 25,
    current:0,
    name:"gem2"
},
{
    value: 15,
    current:0,
    name:"gem3"
},
{
    value: 18,
    current:0,
    name:"gem4"
},
{
    value: 12,
    current:0,
    name:"gem5"
},
{
    value: 35,
    current:0,
    name:"gem6"
}];

var imagesArray = [
{src:"../images/gem1.png"},
{src:"../images/gem2.png"},
{src:"../images/gem3.png"},
{src:"../images/gem4.png"},
{src:"../images/gem5.png"},
{src:"../images/gem6.png"},
    {src:"../images/kirp.jpg"}
];

var capturedItem;

var initCanvas = function () {
    canvas = $("#gameCanvas");
    canvasContext = canvas[0].getContext("2d"); 
    initImages();

    generateGemBoard();

setTimeout(() => {
findMatches();
}, 300);
    
}

var canvasSize = {
    width: 550,
    height: 550
}

var initImages = function(){
    for(let item of imagesArray){
        let imageObj = new Image();
        imageObj.src = item.src;
        imageObj.onload = function(){
            item.image = this;
        }
        

    }
}

var generateGemBoard = function(){
    for(let i=0; i <= rowsCount; i++){
        for(let j =0; j <= columnsCount; j++){
            
             let arr = randomArray();

            let img = arr[Math.floor(Math.random()*arr.length)];           
            
            generateNewItem(j * 50, i * 50, img.src);
        }
    }
}

let randomArray = function(){
     let arr = [];
            
            for(let iter = 0; iter<10; iter++){
                for(let im of imagesArray){
                    if(iter != 9 && im.src.indexOf("kirp") != -1)
                       continue;                    
                    
                     arr.push(im);
                }
            }
    return arr;
}

var generateNewGems = function(){
    let count = 0;
    for(let item of itemArray){
        if(item.src == null){
            let ctx = canvasContext;
            
            let arr = randomArray();

            let img = arr[Math.floor(Math.random()*arr.length)];

             ctx.drawImage(img.image, item.x + 1 ,item.y + 1 , blockSize - 2, blockSize - 2);                

             item.src =img.src; 
             count++;
        }
    }

    return count;
}

var redrawAllGems = () => {
      canvas = $("#gameCanvas");
    canvasContext = canvas[0].getContext("2d"); 
    let ctx = canvasContext;
    
    initImages();
    
    setTimeout(_ => {
        for(let item of itemArray){        
        
        let  imageObj = new Image();

         let img = findImage(item.src);
           
        
        imageObj.onload = function() {
            ctx.drawImage(this, item.x + 1 , item.y + 1 , blockSize - 2, blockSize - 2);           
        };

        imageObj.src = item.src;           
        }
        
        setTimeout(_ => {
             generateNewGems();
            
             setTimeout(_ => {
                    findMatches();
                }, 200);
        }, 500);
       
    },300)
    
    
}

var generateNewItem = function(x, y, imageSrc){
    for(let it of itemArray){
        if(it.x == x && it.y == y)
            return;
    }

    let ctx = canvasContext;

    let  imageObj = new Image();

    imageObj.onload = function() {
        ctx.drawImage(this, x + 1 ,y + 1 , blockSize - 2, blockSize - 2);
    };

    imageObj.src = imageSrc;     

    itemArray.push({
        src: imageSrc,
        x: x,
        y: y
    });
}

var clearCanvas = function(x,y){
    canvasContext.clearRect( x, y, blockSize , blockSize);
}

var findMatches = function(justFind = false){
    let mathesArray = [];

    for(let i = 0; i < itemArray.length - 1; i++){
        let temArrayX = [];
        let temArrayY = [];
        let src = itemArray[i].src;

          if(src == null)
            continue;

        temArrayX.push(itemArray[i]);
        temArrayY.push(itemArray[i]);

        let j = i + 1;

        if(j < itemArray.length){
             while(j < itemArray.length && itemArray[j].src == src){
                temArrayX.push(itemArray[j]);
                j++;
             }


             if(temArrayX.length >= 3){
                 for(let it of temArrayX){
                        mathesArray.push(it);
                }
             }  
        } 

        let k = i + columnsCount + 1;

        if(k < itemArray.length && itemArray[k]){
            while(itemArray.length > k && itemArray[k].src == src){
                temArrayY.push(itemArray[k]);
                k += columnsCount + 1;
             }


             if(temArrayY.length >= 3){
                 for(let it of temArrayY){
                        mathesArray.push(it);
                }
             }  
        }  

    }

    if(justFind)
        return mathesArray;

    for(let m of mathesArray){
        clearCanvas(m.x, m.y);//TODO increase score

        let currScore = findScoreByImage(itemArray[itemArray.indexOf(m)].src);

        itemArray[itemArray.indexOf(m)].src = null;       

        if(currScore != null)
            currScore.current++;       
    }
    rewriteScore();
    if(mathesArray.length > 0){        
            moveDown();
            setTimeout(x=> {
                findMatches();
            }, 350);
    }
    else{
        let count = generateNewGems();
        setTimeout(x=> {
            if(count > 0)
                findMatches();
            }, 350);
    }
}

var moveDown = function(){
    let isMovedDown = false;

    for(let i = itemArray.length - 2 - columnsCount; i >= 0  ; i--){
        if(itemArray[i + columnsCount + 1].src == null && itemArray[i].src != null){
            isMovedDown = true;
            let temp = itemArray[i].src;
            itemArray[i].src = null;
            itemArray[i + columnsCount + 1].src = temp;

            clearCanvas(itemArray[i].x, itemArray[i].y);

            let ctx = canvasContext;

            let src = itemArray[i + columnsCount + 1].src;

            let img = null;

            for(let im of imagesArray){
                if(im.src == src)
                    img = im.image;
            }

             ctx.drawImage(img, itemArray[i + columnsCount + 1].x + 1 ,
                itemArray[i + columnsCount + 1].y + 1 , blockSize - 2, blockSize - 2);
            
        }
    }

    if(isMovedDown)
        moveDown();
    else{
        //findMatches();
    }
}


var captureItem = function(x,y){
    for(let item of itemArray){
        if(item.x <= x && item.x + blockSize > x && item.y <=y && item.y + blockSize > y){
            capturedItem = item;
        }
    }
}

var swapCurrentItem = function(direction){
    let itemToSwap;
    let currentIndex = itemArray.indexOf(capturedItem);

    if(direction == 'up'){
        if(capturedItem.y == 0)
            return;  

        itemToSwap = itemArray[currentIndex - columnsCount - 1]; 
    }  

    if(direction == 'down'){
        if(capturedItem.y > rowsCount * blockSize)
            return;  

        itemToSwap = itemArray[currentIndex + columnsCount + 1]; 
    }  

    if(direction == 'right'){
        if(capturedItem.x > columnsCount * blockSize)
            return;  

        itemToSwap = itemArray[currentIndex + 1]; 
    }  

    if(direction == 'left'){
        if(capturedItem.x == 0)
            return;  

        itemToSwap = itemArray[currentIndex - 1]; 
    }  
    
    if(itemToSwap.src.indexOf("kirp.jpg") != -1)
        return;
    
     moves --;					

	if(moves == 0){
		$(".gameOver").show();
			return;
	}

    $("#moves").text(moves)
    if(moves < 5){
	   $(".moves").css("color", "coral") 
    }


        let currentItem = itemArray[currentIndex];        

        let tempItemSrc = itemToSwap.src;
        itemToSwap.src = capturedItem.src;

        let tempSrcCurrent = currentItem.src;
        currentItem.src = tempItemSrc;

        let ctx = canvasContext;

        clearCanvas(currentItem.x, currentItem.y);
         clearCanvas(itemToSwap.x, itemToSwap.y);

        ctx.drawImage(findImage(currentItem.src), currentItem.x + 1 , currentItem.y + 1 , blockSize - 2, blockSize - 2);       
        ctx.drawImage(findImage(itemToSwap.src), itemToSwap.x + 1 , itemToSwap.y + 1 , blockSize - 2, blockSize - 2);


        let arr = findMatches(true);

        setTimeout(() => {
            if(arr.length == 0){
                currentItem.src = tempSrcCurrent;
                itemToSwap.src = tempItemSrc;

                clearCanvas(currentItem.x, currentItem.y);
                clearCanvas(itemToSwap.x, itemToSwap.y);

                ctx.drawImage(findImage(currentItem.src), currentItem.x + 1 , currentItem.y + 1 , blockSize - 2, blockSize - 2);                
                ctx.drawImage(findImage(itemToSwap.src), itemToSwap.x + 1 , itemToSwap.y + 1 , blockSize - 2, blockSize - 2);
            }else{
                findMatches();
            }
        }, 350); 

}

var findImage = function(src){
    for(let img of imagesArray){
        if(img.src == src)
            return img.image;
    }
    return null;
}

var findScore = function(index){
    for(let gem of gemsToWin){
        if(gem.name.indexOf(index) != -1)
            return gem;
    }

    return null;
}

var findScoreByImage = function(src){
if(src == null)
    return null;

 for(let gem of gemsToWin){
        if(src.indexOf(gem.name) != -1)
            return gem;
    }

    return null;
}

var rewriteScore = function(){
    let count = 0;
    for(let i =1 ; i < 7; i++){
        let gem = findScore(i);

        $(`#gem${i}`).text(`${gem.value} / ${gem.current}`);

        if(gem.value <= gem.current){
            $(`#gem${i}`).css("background-color", "#6EE570");
            count++;
        }
    }

    $("#moves").text(moves);

    if(count == 6){
        $(".gameOver").text("You Win")
        $(".gameOver").show();
    }

    
}


var setCookie = function(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

var getCookie = function (name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 


var saveGame = (name) => {
    localStorage.setItem(`${name}_moves`, moves);
    localStorage.setItem(`${name}_gemsToWin`, JSON.stringify(gemsToWin));
    localStorage.setItem(`${name}_items`, JSON.stringify(itemArray));
}

var loadGame = (name) => {
    moves = localStorage.getItem(`${name}_moves`);
    gemsToWin = JSON.parse(localStorage.getItem(`${name}_gemsToWin`));
    itemArray = JSON.parse(localStorage.getItem(`${name}_items`));
}

