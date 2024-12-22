let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameMode = document.querySelector("#game-mode");

let turnO = true;
let count = 0;

const winPatterns = [
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
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
};

const playTurn = (box) => {
    count++;
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    if (checkWinner()) return;
    if (count === 9) {
        Draw();
        return;
    }
    turnO = !turnO;

    if (gameMode.value === "ai" && !turnO) {
        setTimeout(aiMove, 500); // AI plays after a short delay
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO || gameMode.value === "friend") {
            playTurn(box);
        }
    });
});

const aiMove = () => {
    let availableBoxes = Array.from(boxes).filter((box) => box.innerText === "");
    if (availableBoxes.length === 0) return;

    let aiBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    playTurn(aiBox);
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
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};

const Draw = () => {
    msg.innerText = `It's a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
