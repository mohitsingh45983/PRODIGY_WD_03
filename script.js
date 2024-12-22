let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let  msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;


const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,6],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Button was clicked");
        count++;
        console.log("count=",count);
        if(count === 9)
        {
            Draw();
        }
        if(turnO)
        {
            console.log("O");
            box.innerText = "O";
            turnO = false;        
        }
        else
        {
            console.log("X");
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = "true";

        checkWinner();    
    });
});

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
  
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{

    for(let patterns of winPatterns)
    {
        pos1Val = boxes[patterns[0]].innerText;
        pos2Val = boxes[patterns[1]].innerText;
        pos3Val = boxes[patterns[2]].innerText;

        if(pos1Val != "" && pos2Val != ""  && pos3Val != "")
        {
            if(pos1Val === pos2Val  && pos2Val === pos3Val)
            {
                showWinner(pos1Val);

            }

        }
    }
};

const Draw = () =>{
    msg.innerText = `It's a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();

};

newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);





