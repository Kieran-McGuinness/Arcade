let initialState;
let table = document.getElementsByTagName("table")[0];
let score = 0;
let highScore = 0;
let playingField = [];
let playingFieldArray = [];
let rowCount = 0;
let columnCount = 0;
let snake = {
    body: [],
    nextDirection: [1,0],
    nextDirectionWord: "down"
}
let speed = 800;
let movement = ""
let randomRow = 0;
let randomColumn = 0;
function createArray(){
    for (let i = 0; i < playingField.length; i++){
    playingFieldArray.push(playingField[i].children)
    }
}
// function resetGame(){
// remove "removed" from boardsetup
// delete created boardsetip
// reset score

// }
function makePlayingField(rowLength, columnLength){
    for (let o = 0; o < columnLength; o++ ){
    makeRow(rowLength)
    }
playingField = document.getElementsByTagName("tr");
createArray();
rowCount = playingFieldArray[0].length;
columnCount = document.getElementsByTagName("tr").length;
let snakeStart = Math.floor(rowCount/2)
snake.body.push([0, snakeStart]);
snake.body.push([0, snakeStart+1]);
table.id = "tablestyle";
}

document.getElementById("submit").addEventListener("click", customField)
document.getElementById("quickplay").addEventListener("click", quickPlay)
document.getElementById("playbtn").addEventListener("click", startSnake)
document.getElementById("resetbtn").addEventListener("click", resetGame)

function resetGame(){
    for (let p = 0; p < columnCount; p++){
    playingField[0].remove()
    }
    document.getElementById("boardsetup").classList.remove("removed");
    document.getElementById("playbtn").classList.add("removed");
    document.getElementById("resetbtn").classList.add("removed");
    table.id = "";
    score = 0;
    document.getElementById("score").innerText = score;
    clearInterval(movement)
    playingField = [];
playingFieldArray = [];
rowCount = 0;
columnCount = 0;
snake.body = []
snake.nextDirection = [1,0]
snake.nextDirectionWord = "down"
}

function startSnake(){
   movement = setInterval(tick, speed)
}

function quickPlay(){
    makePlayingField(17, 10)
    document.getElementById("boardsetup").classList.add("removed")
    document.getElementById("playbtn").classList.remove("removed")
    document.getElementById("resetbtn").classList.remove("removed")
    speed = 200;
}
function customField(){
    let customRow = document.getElementById("rows").value;
    let customColumn = document.getElementById("columns").value;
    document.getElementById("boardsetup").classList.add("removed")
    document.getElementById("playbtn").classList.remove("removed")
    document.getElementById("resetbtn").classList.remove("removed")
    makePlayingField(customRow, customColumn)
    
}
document.getElementById("selector").addEventListener("change", function (event){
speed = Number(event.target.value)
})

function makeRow(length){
    let row = document.createElement("tr");
    for (let r = 0; r < length; r++){
        let td = document.createElement("td")
        row.appendChild(td)
    }
    table.appendChild(row)
}

// function renderState(){
//     for (let q = 0; q < snake.body.length; q++){
//         playingFieldArray[snake.body[q][0]][snake.body[q][1]].className = "snake"
//     }
// }

// function onBoardClick(){



// renderState()

// }

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
    playingFieldArray[randomColumn][randomRow].id = "apple";
   }else {
       apple()
   }
   }
}




function tick(){
    apple();
    let nextColumn = snake.body[snake.body.length-1][0] + snake.nextDirection[0];
    let nextRow = snake.body[snake.body.length-1][1] + snake.nextDirection[1];
    if (nextColumn > columnCount - 1 || nextColumn < 0){
        alert ("out of bounds")
        clearInterval(movement)
    }
    else if (nextRow > rowCount - 1 || nextRow < 0){
        alert ("out of bounds")
        clearInterval(movement)
    }else if (playingFieldArray[nextColumn] [nextRow].className === "snake"){
        alert("you ate yourself")
        clearInterval(movement)
    } else {
        if (playingFieldArray[nextColumn] [nextRow].id !== "apple"){
            playingFieldArray[snake.body[0][0]][snake.body[0][1]].className = ""
            snake.body.shift([0])
        }else {
            playingFieldArray[randomColumn][randomRow].id = ""
            score += 1;
            document.getElementById("score").innerText = score;
                if(score > highScore){
                    highScore = score;
                    document.getElementById("highscore").innerText = highScore
                }
        }
    snake.body.push([snake.body[snake.body.length-1][0] + snake.nextDirection[0], snake.body[snake.body.length-1][1] + snake.nextDirection[1]])
    
    for (let q = 0; q < snake.body.length; q++){
    playingFieldArray[snake.body[q][0]][snake.body[q][1]].style.background = ""
    playingFieldArray[snake.body[q][0]][snake.body[q][1]].className = "snake"
 
}
}

//   

   
}