let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector(".msg");
let turnInfo = document.querySelector("#turn-info");
let modeSelect = document.querySelector("#mode");

let turnO = true;
let isAIMode = false;
let gameEnded = false;
let lastWinningPattern = [];  

const win_patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    gameEnded = false;
    isAIMode = modeSelect.value === "ai";
    lastWinningPattern = []; 
    enableBoxes();
    msgBox.classList.add("hide");
    updateTurnInfo();
};

const updateTurnInfo = () => {
    if (!gameEnded) {
        if (turnO) {
            turnInfo.innerText = "It's your turn (O)";
        } else if (isAIMode) {
            turnInfo.innerText = "AI is thinking...";
        } else {
            turnInfo.innerText = "It's your friend's turn (X)";
        }
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winning-box");
    }
};

const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("winning-box"); 
    });
};

const showWinner = (winner, pattern) => {
    highlightWinningBoxes(pattern); 
    setTimeout(() => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgBox.classList.remove("hide");
        gameEnded = true;
        disableBoxes();
    }, 500); 
};

const showDraw = () => {
    msg.innerText = "Draw Game";
    msgBox.classList.remove("hide");
    gameEnded = true;
    disableBoxes();
};

const checkWinner = () => {
    let allBoxesFilled = true;

    for (let pattern of win_patterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                lastWinningPattern = pattern; 
                showWinner(pos1Val, pattern); 
                return true; 
            }
        }
    }

    for (let box of boxes) {
        if (box.innerText === "") {
            allBoxesFilled = false;
            break;
        }
    }

    if (allBoxesFilled) {
        showDraw();
    }

    return false;
};

const simulateWinner = () => {
    for (let pattern of win_patterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            return true; 
        }
    }
    return false; 
};

const makeAIMove = () => {
    if (gameEnded) return; 
    turnInfo.innerText = "AI is thinking...";

    const emptyBoxes = [...boxes].filter(box => box.innerText === "");

    // Check for AI's own winning move
    for (let box of emptyBoxes) {
        box.innerText = "X"; 
        if (simulateWinner()) { 
            box.disabled = true; 
            checkWinner(); 
            return;
        }
        box.innerText = ""; 
    }

    // Check for O's winning move and block
    for (let box of emptyBoxes) {
        box.innerText = "O";
        if (simulateWinner()) { 
            box.innerText = "X"; 
            box.disabled = true;
            turnO = true;
            updateTurnInfo();
            checkWinner(); 
            return; 
        }
        box.innerText = ""; 
    }

    // Make a random move
    if (!gameEnded && emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        const chosenBox = emptyBoxes[randomIndex];
        chosenBox.innerText = "X";
        chosenBox.disabled = true; 
        turnO = true; 
        updateTurnInfo();
        checkWinner();
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameEnded) return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        updateTurnInfo();
        checkWinner();

        if (!turnO && isAIMode && !gameEnded) {
            setTimeout(makeAIMove, 500);
        }
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
modeSelect.addEventListener("change", resetGame);

updateTurnInfo();
