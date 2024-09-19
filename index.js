const newgamebtn = document.querySelector(".game-btn");
const currplayer = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");

let currentPlayer;
let gameGrid;


const winningPositions =[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,4,8],
   [2.4,6],
   [0,3,6],
   [1,4,7],
   [2,5,8]
];

function initGame(){
   currentPlayer = "X";
   gameGrid = ["","","","","","","","",""];
   
   //pehle ke boxes khali kro 
   boxes.forEach((box,index)=>{
         box.innerText="";
         box.style.pointerEvents = "all";
         box.classList = `box box${index+1}`;
   });
   
   currplayer.innerText = `Current Player - ${currentPlayer}`;
   newgamebtn.classList.remove("active");
}
initGame();

function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    currplayer.innerText = `Current Player - ${currentPlayer}`; 
}

function gameOver(){
    let answer ="";

    winningPositions.forEach((position)=>{
        if( (gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]==gameGrid[position[1]] && gameGrid[position[1]]==gameGrid[position[2]]) )
        {
            //set answer
            if(gameGrid[position[0]]=="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            //unset events
            boxes.forEach((box)=>{
              box.style.pointerEvents="none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    if(answer!==""){
        console.log("1");
        currplayer.innerText = `Winner Player - ${answer}`;
        console.log("2");
        newgamebtn.classList.add("active");
        return;
    }

    console.log("Game tie hone wala hai")
    //if game is tied
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
          fillCount++;
        }
        console.log("tie hua ya nay");
    });

    console.log("Bas hone wala hha");
    if(fillCount==9){
        console.log("nay hua kya hua");
        currplayer.innerText="Game Tied !";
        newgamebtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
     boxes[index].innerText=`${currentPlayer}`;
     gameGrid[index]=`${currentPlayer}`;
     
     //disable events on filled boxes
     boxes[index].style.pointerEvents = "none";

     swapTurn();

     //game khtm to nahi hua n
     gameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newgamebtn.addEventListener("click",initGame);