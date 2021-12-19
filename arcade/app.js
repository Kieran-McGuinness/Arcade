const table = document.getElementsByTagName("table")[0];  
let score = 0;
let highScore = 0;
let playingField = [];
let playingFieldArray = [];
let rowCount = 0;
let columnCount = 0;
let sApple = 0;
let playCount = 0;
let snake = { //object that holds snakes body and the currently inputed direction for the snake and the last direction his head from created from
    body: [],
    nextDirection: [1,0],
    nextDirectionWord: "down",
    lastDirection: "down",
}
let tickCount = 0;  //holds the current tickCount, used to determine when certain events should occur during the game
let speed = 700; //current games speed
let lobbySpeed = 0; //hold the speed the game started at incase it is increased or decreased during gameplay
let movement = "" //initialized the variable that will hold setInterval when it is active
let randomRow = 0;
let randomColumn = 0;

function makeRow(length){ //creates a table row inside the empty table element based on value for length
    let row = document.createElement("tr");
    for (let r = 0; r < length; r++){
        let td = document.createElement("td")
        row.appendChild(td)
    }
    table.appendChild(row)
}

function createArray(){     //function that creates an array of arrays of the current board by pushing the children of each tr element into their own array
    for (let i = 0; i < playingField.length; i++){
    playingFieldArray.push(playingField[i].children)
    }
}

function customField(){   //uses the values entered into the input boxes for the custom board, returns an error if they are empty. if numbers are valid, uses makePlayingField function to generate the board based on the given numbers and removes the hidden css from the game elements and hides the board setup items. triggered by event listener on submit button
    let customRow = document.getElementById("rows").value;
    let customColumn = document.getElementById("columns").value;
    if (customColumn === ''|| customRow === ''){
        alert("Tiles per Row and Number of Rows cannot be empty")
    }else {
    document.getElementById("boardsetup").classList.add("removed")
    document.getElementById("gamebuttons").classList.remove("removed")
    document.getElementById("rules").classList.remove("removed")
    makePlayingField(customRow, customColumn)
    }
}

function makePlayingField(rowLength, columnLength){ //uses the make row function to make the rows needed for the custom board. Sets the starting position for the snake in the middle of the top row. Uses createArray function to make the playingfieldArray that will be used to track snakes movement
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

document.getElementById("submit").addEventListener("click", customField) //event listeners for the different buttons on the pages
document.getElementById("quickplay").addEventListener("click", quickPlay)
document.getElementById("playbtn").addEventListener("click", startSnake)
document.getElementById("resetbtn").addEventListener("click", resetGame)
document.getElementById("selector").addEventListener("change", function (event){ //event listener for the selection html element that changes the custom boards snake speed
    speed = Number(event.target.value)
    })
document.addEventListener('keydown', controls)//event listener for snake controls



function startSnake(){ //triggered by event listener on play button. stars setInterval at games selected speed. if game has already been started once at these settings the button becomes play again and resets current snake and setInterval speed, clears playing board of all added ids and classes and restarts game with a new snake
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

function resetGame(){ //resets the game back to the custom board page. triggered by event listener on new board button. hides the gameplay information and unhides board setup. deletes old playing field elements and resets variables to empty or default.
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



function quickPlay(){ //triggered by event listener on quickplay button. starts game with a 21x16 playing field at 200 speed. hides board setup and unhides gameplay information and buttons
    makePlayingField(21, 16)
    document.getElementById("boardsetup").classList.add("removed")
    document.getElementById("gamebuttons").classList.remove("removed")
    document.getElementById("rules").classList.remove("removed")
    speed = 200;
}


function controls (event){  //controls snake movements and tells tick where to create next snakes head. does not allow movement to be chosen that would back track onto snakes current head. listens for up,down,left, right arrow keys
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
function apple(){//function that generates "apple" element on a random board cell that is not currently set as snake or another type of apple. if the randomly chosen cell is currently part of the snake or another apple runs the function again and chooses a new random cell. applies "apple" id to selected cell if it is empty
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
function superApple(){ //function that generates "superapple" element on a random board cell that is not currently set as snake or another type of apple. if the randomly chosen cell is currently part of the snake or another apple runs the function again and chooses a new random cell. applies "superapple" id to selected cell if it is empty
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
function speedApple(){//function that generates "speedapple" element on a random board cell that is not currently set as snake or another type of apple. if the randomly chosen cell is currently part of the snake or another apple runs the function again and chooses a new random cell. applies "speedapple" id to selected cell if it is empty
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

function slowApple(){//function that generates "slowapple" element on a random board cell that is not currently set as snake or another type of apple. if the randomly chosen cell is currently part of the snake or another apple runs the function again and chooses a new random cell. applies "slowapple" id to selected cell if it is empty
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


function tick(){ //controls most of the actual gameplay, triggers every X milliseconds where X is the current games speed. moves the snake based on player controls and controls what happens when the snake eats the different apples. Also determines when game is over based on hitting a wall or eating part of the snakes body.
    apple(); //creates a regular apple every tick if one does not already exist
    tickCount++; //adds to tickcount variable which is used to trigger the creation of different apples on the board
    let nextColumn = snake.body[snake.body.length-1][0] + snake.nextDirection[0];
    let nextRow = snake.body[snake.body.length-1][1] + snake.nextDirection[1];
    if (tickCount === 40){ //creates a superApple on 40th game tick
        superApple();
    }
    if (tickCount > 80){//after tick count passes 80 will randomly create either a speed or slow apple. resets tick count back to 0
        if (Math.floor(Math.random() * 10) > 5){
        speedApple();
        tickCount = 0;
        }
        else {
            slowApple();
            tickCount = 0;
        }
    }
    if (nextColumn > columnCount - 1 || nextColumn < 0){//checks whether snakes head will be created outside of playing field which means snake has hit a wall, alerts that game is over if true
        clearInterval(movement)
        alert ("Ouch! You ran into the wall! Game Over!")
    }
    else if (nextRow > rowCount - 1 || nextRow < 0){//checks whether snakes head will be created outside of playing field which means snake has hit a wall, alerts that game is over if true
        clearInterval(movement)
        alert ("Ouch! You ran into the wall! Game Over!")
    }else if (playingFieldArray[nextColumn] [nextRow].className === "snake"){//checks if next snakes head will intersect with part of the snakes current body, alerts that game is over if it would
        clearInterval(movement)
        alert("Uh-Oh! You bit yourself! Game Over!")
    } else {
         if (playingFieldArray[nextColumn] [nextRow].id === "apple" || playingFieldArray[nextColumn] [nextRow].id === "superapple" || sApple > 0 || playingFieldArray[nextColumn] [nextRow].id === "speedapple" || playingFieldArray[nextColumn] [nextRow].id === "slowapple"){ //if game is not over checks if next head spot is occupied by any of the special apples. if so 1 point is added and tail is not deleted(snake gets bigger)
            score += 1;
             if (playingFieldArray[nextColumn] [nextRow].id === "apple"){// if apple is eaten 1 point is added to score from above and apple id is removed from the cell
            document.getElementById("apple").id = "";
             }
             if (playingFieldArray[nextColumn] [nextRow].id === "superapple"){ //if supper apple is eaten id is cleared and 5 sApple counter is added. sApple counter prevents snakes tail from being deleted as long as it exists making snake get bigger once per tick for every sApple count and adds 1 score per turn per sApple count
                document.getElementById("superapple").id = "";
                sApple += 5;
                 }
                 if (sApple > 0){ //if sApple count is above 0, 1 count is removed
                     sApple--
                 }
                 if (playingFieldArray[nextColumn] [nextRow].id === "speedapple"){ //clears speedapple id and decreases time between ticks by 25milliseconds, resets interval with new interval speed.
                    clearInterval(movement)
                     speed -= 25;
                    movement = setInterval(tick, speed)
                document.getElementById("speedapple").id = ""
                 }
                 if (playingFieldArray[nextColumn] [nextRow].id === "slowapple"){//clears slowapple id and increases time between intervals bt 25 miliseconds, resets interval with new interval speed.
                    clearInterval(movement)
                     speed += 25;
                    movement = setInterval(tick, speed)
                document.getElementById("slowapple").id = ""
                 }
        }else { //if apple isnt eaten and sApple count doesnt exist removes end of snake as head of snake is created
            playingFieldArray[snake.body[0][0]][snake.body[0][1]].className = ""
            snake.body.shift([0])
    }
}
    snake.body.push([snake.body[snake.body.length-1][0] + snake.nextDirection[0], snake.body[snake.body.length-1][1] + snake.nextDirection[1]]);
    snake.lastDirection = snake.nextDirectionWord  //adds new head of snake based on current directions inputed by player
    for (let q = 0; q < snake.body.length; q++){
    playingFieldArray[snake.body[q][0]][snake.body[q][1]].className = "snake" //adds snake class to all parts of snakes boddy
    document.getElementById("score").innerText = score;//changes score screen to show current score
    if(score > highScore){//updated high score if current score is the new high score
        highScore = score;
        document.getElementById("highscore").innerText = highScore;
    }
 
}
}



   
