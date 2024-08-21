//1. Deposit Money
//2. Determine number of betting lines 
//3. Collect Bet amount
//4. Spin machine
//5. Check if user won
//6. distribute winnings
//7. play again

const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

function deposit(){
    while (true) {
        const deposit_amount = prompt("Enter deposit amount: ");
        const number_deposit_amount = parseFloat(deposit_amount);

        if(isNaN(number_deposit_amount) || number_deposit_amount <= 0){
            console.log("Invalid deposit amount, try again")
        } 
        else {
            return number_deposit_amount;
        }
    }
};


function Number_of_lines(){
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const number_of_lines = parseFloat(lines);

        if(isNaN(number_of_lines) || number_of_lines <= 0 || number_of_lines > 3){
            console.log("Invalid number of lines, try again")
        } 
        else {
            return number_of_lines;
        }
    }
};

function getBet(balance,Number_of_Lines){
    while (true) {
        const bet = prompt("Enter the per line bet: ");
        const number_bet = parseFloat(bet);

        if(isNaN(number_bet) || number_bet <= 0 || number_bet > (balance/Number_of_Lines)){
            console.log("Invalid number of lines, try again");
        } 
        else {
            return number_bet;
        }
    }
};

function spin(){
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = []
    for (let i = 0; i < COLS; i++) {
            reels.push([]);
            const ReelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * ReelSymbols.length);
            const selectedSymbol = ReelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            ReelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

function transposeReels(reels) {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push ([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return  rows;
};

function printSlots(rows){
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1){
                rowString +=  " | ";
            }
        }
        console.log(rowString)
    }
};

function getWinnings(rows, bet, Number_of_Lines){
    let winnings = 0;
    for (let row = 0; row < Number_of_Lines; row++){
        const symbols = rows[row];
        let allSame = true;
        
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

function game(){
    let balance = deposit();
    while (true){
        console.log("You have $" + balance);
        const Number_of_Lines = Number_of_lines();
        let bet = getBet(balance, Number_of_Lines);
        balance -= bet * Number_of_Lines;
        const reels = spin();
        const rows = transposeReels(reels);
        printSlots(rows);
        const winnings = getWinnings(rows, bet, Number_of_Lines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again? (Y/N)");
        if (playAgain != Y) break;
    } 
};

game();
