let initialState;
let score = 0
let playingField = document.getElementsByTagName("tr");
let playingFieldArray = [];
let snake = {
    body: [[6,5],[6,6],[6,7]],
    nextDirection: [0,1],
    nextDirectionWord: "right"
}
let intervalSpeed = 1300;
// let speed = setInterval(tick, intervalSpeed);
document.onload = createArray()
let rowCount = playingFieldArray[0].length;
let columnCount = document.getElementsByTagName("tr").length;
let randomRow = 0;
let randomColumn = 0;


 function createArray(){
for (let i = 0; i < playingField.length; i++){
playingFieldArray.push(playingField[i].children)
}
}



function renderState(){
    for (let q = 0; q < snake.body.length; q++){
        playingFieldArray[snake.body[q][0]][snake.body[q][1]].className = "snake"
    }
}

function onBoardClick(){



renderState()

}

document.addEventListener('keydown', controls)
function controls (event){
var key = event.which || event.keyCode;
// up, down, left, right
if (key === 38){
    if (snake.nextDirectionWord !== "down"){
 snake.nextDirection = [-1,0],
 snake.nextDirectionWord = "up";
    }
}
if (key === 40){
    if (snake.nextDirectionWord !== "up"){
        snake.nextDirection = [1,0],
        snake.nextDirectionWord = "down";
           }
}
if (key === 37){
    if (snake.nextDirectionWord !== "right"){
        snake.nextDirection = [0,-1],
        snake.nextDirectionWord = "left";
           }
}
if (key === 39){
    if (snake.nextDirectionWord !== "left"){
        snake.nextDirection = [0,1],
        snake.nextDirectionWord = "right";
           }
}

}
function apple(){
    if (document.getElementById("apple") === null){
        randomRow = Math.floor(Math.random() * (rowCount-1))
        randomColumn = Math.floor(Math.random() * (columnCount-1))
   if (playingFieldArray[randomColumn][randomRow].className !== "snake"){
    playingFieldArray[randomColumn][randomRow].id = "apple"
   }else {
       apple()
   }
   }
}




function tick(){
    apple();
    if (playingFieldArray[snake.body[snake.body.length-1][0] + snake.nextDirection[0]] [snake.body[snake.body.length-1][1] + snake.nextDirection[1]] === undefined){
        clearInterval(speed);
        alert("out of bounds")
    }else if (playingFieldArray[snake.body[snake.body.length-1][0] + snake.nextDirection[0]] [snake.body[snake.body.length-1][1] + snake.nextDirection[1]].className === "snake"){
        clearInterval(speed);
        alert("you ate yourself")
    } else {
        if (playingFieldArray[snake.body[snake.body.length-1][0] + snake.nextDirection[0]] [snake.body[snake.body.length-1][1] + snake.nextDirection[1]].id !== "apple"){
            playingFieldArray[snake.body[0][0]][snake.body[0][1]].className = ""
            snake.body.shift([0])
        }else {
            playingFieldArray[randomColumn][randomRow].id = ""
            score += 1;
            document.getElementById("score").innerText = score;
        }
    snake.body.push([snake.body[snake.body.length-1][0] + snake.nextDirection[0], snake.body[snake.body.length-1][1] + snake.nextDirection[1]])
    
    for (let q = 0; q < snake.body.length; q++){
    playingFieldArray[snake.body[q][0]][snake.body[q][1]].className = "snake"
 
}
}

//   

   
}




