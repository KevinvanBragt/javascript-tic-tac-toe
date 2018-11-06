let squares = document.querySelectorAll(".square");
let message = document.getElementById("message");
let emptycount = 0
let possibleMoves = [];
let randomMove = 0;
let winning = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]]

squares.forEach(square => {
    if (square.addEventListener){
        square.addEventListener("click", function(){makeMove(square)});      
}   else if (square.attachEvent) {
        square.attachEvent("onclick", function(){});
} });

function makeMove(squareID){
    message.innerText = " ";
    
    if (isEmpty(squareID)){
        squareID.classList.add('x');
        hasGameEnded();
        makeMoveAI();
        hasGameEnded();
    } else {
        message.innerText = "dat is geen geldige zet! probeer wat anders";
    }    
    
}

function hasGameEnded(){
    checkWin()
    emptycount = 0
    squares.forEach(square => {
        if (isEmpty(square)){
            emptycount += 1
        } else {}
    })
    if (emptycount === 0){
        message.innerText = "\n it's a draw!";
        setTimeout(reset, 1500);
    }
    
}

function isEmpty(squareID){
    if (squareID.classList.contains('x') || squareID.classList.contains('o')){ 
        return false;
    } else {
        return true;
    }
}

function checkWin(){
    for (win=0; win < 8; win++){  
        if  (squares[winning[win][0]].classList.contains('x') && squares[winning[win][1]].classList.contains('x') && squares[winning[win][2]].classList.contains('x')){
            message.innerText = "\n you won!";
            setTimeout(reset, 1500);
        } else if (squares[winning[win][0]].classList.contains('o') && squares[winning[win][1]].classList.contains('o') && squares[winning[win][2]].classList.contains('o')){
            message.innerText = "\n the computer won!";
            setTimeout(reset, 1500);
        } else {}
    }
}

function getBestMove(possibleMoves){
    if (possibleMoves.length > 0){
        randomMove = Math.floor(Math.random() * possibleMoves.length)
        if (lastBlock('o') < 99 && possibleMoves.includes(squares[lastBlock('o')])) {return squares[lastBlock('o')]}
        else if (lastBlock('x') < 99 && possibleMoves.includes(squares[lastBlock('x')])) {return squares[lastBlock('x')]}
        else if (possibleMoves.includes(squares[4])) {return squares[4]}
        else if (possibleMoves.includes(squares[2])) {return squares[2]}
        else if (possibleMoves.includes(squares[0])) {return squares[0]}
        else if (possibleMoves.includes(squares[8])) {return squares[8]}
        else if (possibleMoves.includes(squares[6])) {return squares[6]}
        else {return possibleMoves[randomMove]}
    }
}

function getPossibleMoves(){
    possibleMoves = [];
    squares.forEach(square => {
    if (isEmpty(square)) { possibleMoves.push(square);} 
    })
    return possibleMoves;
}

function makeMoveAI(){
    if (getPossibleMoves().length > 0){
        getBestMove(getPossibleMoves()).classList.add('o');
    }
}

function reset(){
    squares.forEach(square => {square.classList.remove('x')})
    squares.forEach(square => {square.classList.remove('o')})
}

function lastBlock(sign){
    for (win=0; win < 8; win++){  
        if      (squares[winning[win][0]].classList.contains(sign) && squares[winning[win][1]].classList.contains(sign)) { return winning[win][2]}
        else if (squares[winning[win][0]].classList.contains(sign) && squares[winning[win][2]].classList.contains(sign)) { return winning[win][1]}
        else if (squares[winning[win][1]].classList.contains(sign) && squares[winning[win][2]].classList.contains(sign)) { return winning[win][0]}
    } return 99;
}

