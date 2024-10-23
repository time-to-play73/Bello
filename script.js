const board = Array(9).fill(null);
const human = 'X';
const ai = 'O';
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');

cells.forEach(cell => cell.addEventListener('click', humanMove));

function humanMove(event) {
    const index = event.target.dataset.index;
    if (!board[index] && !gameOver) {
        board[index] = human;
        event.target.textContent = human;
        if (checkWinner(human)) {
            showMessage("You won! 🏆 Get ready for the 'Learn How to Learn' session! Prepare for cinema surprises! 🎬");
            return;
        }
        if (!board.includes(null)) {
            showMessage("It's a tie! Try again!");
            return;
        }
        computerMove();
    }
}

function computerMove() {
    const emptyCells = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = ai;
    cells[randomIndex].textContent = ai;

    if (checkWinner(ai)) {
        showMessage("Computer won! Try again!");
    }
}

function checkWinner(player) {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

function showMessage(message) {
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
    gameOver = true;
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    popup.classList.add('hidden');
    gameOver = false;
}
