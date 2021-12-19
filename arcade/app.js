const table = document.getElementsByTagName("table")[0];
let score = 0;
let highScore = 0;
let playingField = [];
let playingFieldArray = [];
let rowCount = 0;
let columnCount = 0;
let sApple = 0;
let playCount = 0;
let snake = {
    body: [],
    nextDirection: [1,0],
    nextDirectionWord: "down",
    lastDirection: "down",
}
let tickCount = 0;
let speed = 700;
let lobbySpeed = 0;
let movement = ""
let randomRow = 0;
let randomColumn = 0;
function createArray(){
    for (let i = 0; i < playingField.length; i++){
    playingFieldArray.push(playingField[i].children)
    }
}

function makePlayingField(rowLength, columnLength){
    for (let o = 0; o < columnLength; o++ ){
    makeRow(rowLength)
    }
playingField = document.getElementsByTagName("tr");
createArray();
rowCount = playingFieldArray[0].length;
columnCount = document.getElementsByTagName("tr").length;
let snakeStart = (Math.floor(rowCount/2)) - 1;
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
    document.getElementById("gamebuttons").classList.add("removed");
    document.getElementById("rules").classList.add("removed");
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
snake.lastDirection = "down"
document.getElementById("playbtn").innerText = "Play"
speed = 800;
tickCount = 0;
playCount = 0;
}

function startSnake(){
    if(playCount > 0){
        clearInterval(movement);
        score = 0;
        speed = lobbySpeed;
        snake.body = []
        snake.nextDirection = [1,0]
        snake.nextDirectionWord = "down"
        snake.lastDirection = "down"
       rowCount = playingFieldArray[0].length;
    columnCount = document.getElementsByTagName("tr").length;
    let snakeStart = (Math.floor(rowCount/2)) - 1;
    snake.body.push([0, snakeStart]);
    snake.body.push([0, snakeStart+1]);
    let td =  document.getElementsByTagName("td");
    for (let l = 0; l < td.length; l++){
        td[l].classList.remove("snake")
        td[l].id = "";
        td[l].innerText = "";
       }
    }
    if (playCount < 1){
        lobbySpeed = speed
    }
   movement = setInterval(tick, speed);
   playCount++
   tickCount = 0;
   document.getElementById("playbtn").innerText = "Play Again"
}

function quickPlay(){
    makePlayingField(21, 16)
    document.getElementById("boardsetup").classList.add("removed")
    document.getElementById("gamebuttons").classList.remove("removed")
    document.getElementById("rules").classList.remove("removed")
    speed = 300;
}
function customField(){
    let customRow = document.getElementById("rows").value;
    let customColumn = document.getElementById("columns").value;
    if (customColumn === undefined || customRow === undefined){
        alert("value must be a number")
    }else {
    document.getElementById("boardsetup").classList.add("removed")
    document.getElementById("gamebuttons").classList.remove("removed")
    document.getElementById("rules").classList.remove("removed")
    makePlayingField(customRow, customColumn)
    }
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

document.addEventListener('keydown', controls)
function controls (event){
var key = event.which || event.keyCode;
// up, down, left, right
if (key === 38){
    if (snake.lastDirection !== "down"){
 snake.nextDirection = [-1,0],
 snake.nextDirectionWord = "up";
    }
}
if (key === 40){
    if (snake.lastDirection !== "up"){
        snake.nextDirection = [1,0],
        snake.nextDirectionWord = "down";
           }
}
if (key === 37){
    if (snake.lastDirection !== "right"){
        snake.nextDirection = [0,-1],
        snake.nextDirectionWord = "left";
           }
}
if (key === 39){
    if (snake.lastDirection !== "left"){
        snake.nextDirection = [0,1],
        snake.nextDirectionWord = "right";
           }
}

}
function apple(){
    if (document.getElementById("apple") === null){
        randomRow = Math.floor(Math.random() * (rowCount-1))
        randomColumn = Math.floor(Math.random() * (columnCount-1))
   if (playingFieldArray[randomColumn][randomRow].className !== "snake" && playingFieldArray[randomColumn][randomRow].id !=="superapple" && playingFieldArray[randomColumn][randomRow].id !=="speedapple" && playingFieldArray[randomColumn][randomRow].id !=="slowapple"){
    playingFieldArray[randomColumn][randomRow].id = "apple";
   }else {
       apple()
   }
   }
}
function superApple(){
    if (document.getElementById("superapple") === null){
        randomRow = Math.floor(Math.random() * (rowCount-1))
        randomColumn = Math.floor(Math.random() * (columnCount-1))
   if (playingFieldArray[randomColumn][randomRow].className !== "snake" && playingFieldArray[randomColumn][randomRow].id !=="apple" && playingFieldArray[randomColumn][randomRow].id !=="speedapple" && playingFieldArray[randomColumn][randomRow].id !=="slowapple"){
    playingFieldArray[randomColumn][randomRow].id = "superapple";
   }else {
       superApple()
   }
   }
}
function speedApple(){
    if (document.getElementById("speedapple") === null){
        randomRow = Math.floor(Math.random() * (rowCount-1))
        randomColumn = Math.floor(Math.random() * (columnCount-1))
   if (playingFieldArray[randomColumn][randomRow].className !== "snake" && playingFieldArray[randomColumn][randomRow].id !=="apple" && playingFieldArray[randomColumn][randomRow].id !=="superapple" && playingFieldArray[randomColumn][randomRow].id !=="slowapple"){
    playingFieldArray[randomColumn][randomRow].id = "speedapple";
   }else {
       speedApple()
   }
   }
}

function slowApple(){
    if (document.getElementById("slowapple") === null){
        randomRow = Math.floor(Math.random() * (rowCount-1))
        randomColumn = Math.floor(Math.random() * (columnCount-1))
   if (playingFieldArray[randomColumn][randomRow].className !== "snake" && playingFieldArray[randomColumn][randomRow].id !=="apple" && playingFieldArray[randomColumn][randomRow].id !=="superapple" && playingFieldArray[randomColumn][randomRow].id !=="speedapple"){
    playingFieldArray[randomColumn][randomRow].id = "slowapple";
   }else {
       slowApple()
   }
   }
}


function tick(){
    apple();
    tickCount++;
    let nextColumn = snake.body[snake.body.length-1][0] + snake.nextDirection[0];
    let nextRow = snake.body[snake.body.length-1][1] + snake.nextDirection[1];
    if (tickCount === 40){
        superApple();
    }
    if (tickCount > 80){
        if (Math.floor(Math.random() * 10) > 5){
        speedApple();
        tickCount = 0;
        }
        else {
            slowApple();
            tickCount = 0;
        }
    }
    if (nextColumn > columnCount - 1 || nextColumn < 0){
        clearInterval(movement)
        alert ("Ouch! You ran into the wall!")
    }
    else if (nextRow > rowCount - 1 || nextRow < 0){
        clearInterval(movement)
        alert ("Ouch! You ran into the wall!")
    }else if (playingFieldArray[nextColumn] [nextRow].className === "snake"){
        clearInterval(movement)
        alert("Uh-Oh! You bit yourself!")
    } else {
         if (playingFieldArray[nextColumn] [nextRow].id === "apple" || playingFieldArray[nextColumn] [nextRow].id === "superapple" || sApple > 0 || playingFieldArray[nextColumn] [nextRow].id === "speedapple" || playingFieldArray[nextColumn] [nextRow].id === "slowapple"){
            score += 1;
             if (playingFieldArray[nextColumn] [nextRow].id === "apple"){
            document.getElementById("apple").id = "";
             }
             if (playingFieldArray[nextColumn] [nextRow].id === "superapple"){
                document.getElementById("superapple").id = "";
                sApple += 5;
                 }
                 if (sApple > 0){
                     sApple--
                 }
                 if (playingFieldArray[nextColumn] [nextRow].id === "speedapple"){
                    clearInterval(movement)
                     speed -= 50;
                    movement = setInterval(tick, speed)
                document.getElementById("speedapple").id = ""
                 }
                 if (playingFieldArray[nextColumn] [nextRow].id === "slowapple"){
                    clearInterval(movement)
                     speed += 50;
                    movement = setInterval(tick, speed)
                document.getElementById("slowapple").id = ""
                 }
        }else { 
            playingFieldArray[snake.body[0][0]][snake.body[0][1]].className = ""
            snake.body.shift([0])
    }
}
    snake.body.push([snake.body[snake.body.length-1][0] + snake.nextDirection[0], snake.body[snake.body.length-1][1] + snake.nextDirection[1]]);
    snake.lastDirection = snake.nextDirectionWord
    for (let q = 0; q < snake.body.length; q++){
    playingFieldArray[snake.body[q][0]][snake.body[q][1]].className = "snake"
    document.getElementById("score").innerText = score;
    if(score > highScore){
        highScore = score;
        document.getElementById("highscore").innerText = highScore;
    }
 
}
}

//   

   
