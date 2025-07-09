let Board = {};
let letters = ["A","B","C","D","E","F","G","H"];

for (let i = 0; i < letters.length; i++) {
    let lett = letters[i]
    Board[lett] = {}
    for (let num = 1; num <= 8; num++) {
        Board[lett][num] = null
    }
    
}

// WHITE PAWNS
for (let i = 0; i < 8; i++) {
  Board[letters[i]][2] = { part: "pawn", color: "white" };
}

// BLACK PAWNS
for (let i = 0; i < 8; i++) {
  Board[letters[i]][7] = { part: "pawn", color: "black" };
}

// ROOKS
Board["A"][1] = { part: "rook", color: "white" };
Board["H"][1] = { part: "rook", color: "white" };
Board["A"][8] = { part: "rook", color: "black" };
Board["H"][8] = { part: "rook", color: "black" };

// KNIGHTS
Board["B"][1] = { part: "knight", color: "white" };
Board["G"][1] = { part: "knight", color: "white" };
Board["B"][8] = { part: "knight", color: "black" };
Board["G"][8] = { part: "knight", color: "black" };

//BISHOPS
Board["C"][1] = { part: "bishop", color: "white" };
Board["F"][1] = { part: "bishop", color: "white" };
Board["C"][8] = { part: "bishop", color: "black" };
Board["F"][8] = { part: "bishop", color: "black" };

// QUEENS
Board["D"][1] = { part: "queen", color: "white" };
Board["D"][8] = { part: "queen", color: "black" };

// KINGS
Board["E"][1] = { part: "king", color: "white" };
Board["E"][8] = { part: "king", color: "black" };

function isOccupied(position) {
    return Board[position[0]][position[1]] != null;
}
function insideBoard([x, y]) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}


function cords([letter, number]) {
  return [letters.indexOf(letter), number - 1];
}

function changeCords([letter, number,]) {
  return [letters[letter], number + 1];
}

function pawnEat(position) {

}

function movePart(position, newPosition) {
    Board[newPosition[0]][newPosition[1]] = Board[position[0]][position[1]]
    Board[position[0]][position[1]] = null
}

function pawnsMoves(position) {
    let actualPosition;
    let newPosition;
    let pawnsPosibleMoves = [];

    if (Board[position[0]][position[1]]) {
        actualPosition = cords(position);
        newPosition = [actualPosition[0], actualPosition[1] + 1];
        if (!isOccupied(changeCords(newPosition))) {
            pawnsPosibleMoves.push(changeCords(newPosition));
            movePart(changeCords(actualPosition), changeCords(newPosition))
        } 

        if (position[1] == 2){
            let especialPosition = [actualPosition[0], actualPosition[1] + 2];
            pawnsPosibleMoves.push(changeCords(especialPosition));
        }
    }
    return pawnsPosibleMoves;
}



function rookMoves(position) {
    let actualPosition;
    let newPosition;
    let rookPosibleMoves = [];

    if(Board[position[0]][position[1]]) {
        actualPosition = cords(position);

        //Movimiento vertical arriba
        for (let i = actualPosition[1] + 1; i < 8; i++) {
            newPosition = [actualPosition[0], i];
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition));
            }
        }

        //Movimiento vertical abajo
        for (let i = actualPosition[1] - 1;i >= 0; i--) {
            newPosition = [actualPosition[0], i];
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition));
            }
        }

        //Movimiento horizontal derecha
        for (let i = actualPosition[0] + 1;i < 8; i++) {
            newPosition = [i, actualPosition[1]];
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition));
            }
        }

        //Movimiento horizontal izquierda
        for (let i = actualPosition[0] - 1;i >= 0; i--) {
            newPosition = [i, actualPosition[1]];
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition));
            }
        }
    }
   
    return rookPosibleMoves;
 
}

function knightMoves(position) {
    let actualPosition;
    let knightPosibleMoves = [];

    if(Board[position[0]][position[1]]) {

        actualPosition = cords(position);
        let position1 = [actualPosition[0] + 2, actualPosition[1] + 1];
        let position2 = [actualPosition[0] + 1, actualPosition[1] + 2];
        let position3 = [actualPosition[0] - 1, actualPosition[1] + 2];
        let position4 = [actualPosition[0] - 2, actualPosition[1] + 1];
        let position5 = [actualPosition[0] - 2, actualPosition[1] - 1];
        let position6 = [actualPosition[0] - 1, actualPosition[1] - 2];
        let position7 = [actualPosition[0] + 1, actualPosition[1] - 2];
        let position8 = [actualPosition[0] + 2, actualPosition[1] - 1];

        if (insideBoard(position1)) {
            knightPosibleMoves.push(changeCords(position1));
        }
        if (insideBoard(position2)) {
            knightPosibleMoves.push(changeCords(position2));
        }
        if (insideBoard(position3)) {
            knightPosibleMoves.push(changeCords(position3));
        }
        if (insideBoard(position4)) {
            knightPosibleMoves.push(changeCords(position4));
        }
        if (insideBoard(position5)) {
            knightPosibleMoves.push(changeCords(position5));
        }
        if (insideBoard(position6)) {
            knightPosibleMoves.push(changeCords(position6));
        }
        if (insideBoard(position7)) {
            knightPosibleMoves.push(changeCords(position7));
        }
        if (insideBoard(position8)) {
            knightPosibleMoves.push(changeCords(position8));
        }
    }
    return knightPosibleMoves;
}

function bishopMoves(position) {
    let actualPosition;
    let newPosition;
    let bishopPosibleMoves = [];

    if(Board[position[0]][position[1]]) {
        actualPosition = cords(position);
        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] + i, actualPosition[1] + i];
            if (!insideBoard(newPosition)) break;
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] - i, actualPosition[1] + i];
            if (!insideBoard(newPosition)) break;
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] + i, actualPosition[1] - i];
            if (!insideBoard(newPosition)) break;
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] - i, actualPosition[1] - i];
            if (!insideBoard(newPosition)) break;
            if (isOccupied(changeCords(newPosition))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition));
            }
        }
    }
    return bishopPosibleMoves;
}

function kingMoves(position) {
    let actualPosition;
    let kingPosibleMoves = [];

    if(Board[position[0]][position[1]]) {

        actualPosition = cords(position);
        let position1 = [actualPosition[0] - 1, actualPosition[1]];
        let position2 = [actualPosition[0] + 1, actualPosition[1]];
        let position3 = [actualPosition[0], actualPosition[1] + 1];
        let position4 = [actualPosition[0] - 1, actualPosition[1] + 1];
        let position5 = [actualPosition[0] - 1, actualPosition[1] - 1];
        let position6 = [actualPosition[0] + 1, actualPosition[1] - 1];
        let position7 = [actualPosition[0] + 1, actualPosition[1] + 1];
        let position8 = [actualPosition[0], actualPosition[1] - 1];

        if (insideBoard(position1) && !isOccupied(changeCords(position1))) {
            kingPosibleMoves.push(changeCords(position1));
        } 
        if (insideBoard(position2) && !isOccupied(changeCords(position2))) {
            kingPosibleMoves.push(changeCords(position2));
        }
        if (insideBoard(position3) && !isOccupied(changeCords(position3))) {
            kingPosibleMoves.push(changeCords(position3));
        }
        if (insideBoard(position4) && !isOccupied(changeCords(position4))) {
            kingPosibleMoves.push(changeCords(position4));
        }
        if (insideBoard(position5) && !isOccupied(changeCords(position5))) {
            kingPosibleMoves.push(changeCords(position5));
        }
        if (insideBoard(position6) && !isOccupied(changeCords(position6))) {
            kingPosibleMoves.push(changeCords(position6));
        }
        if (insideBoard(position7) && !isOccupied(changeCords(position7))) {
            kingPosibleMoves.push(changeCords(position7));
        }
        if (insideBoard(position8) && !isOccupied(changeCords(position8))) {
            kingPosibleMoves.push(changeCords(position8));
        }
    }
    return kingPosibleMoves;
}

function move(part, position, color) {
    if(part === "pawn") {
        console.log("PAWN MOVES", pawnsMoves(position));
    }

    if(part === "rook") {
        console.log("ROOK MOVES", rookMoves(position));
    }

    if(part === "knight") {
        console.log("KNIGHT MOVES", knightMoves(position));
    }

    if(part === "bishop") {
        console.log("BISHOP MOVES", bishopMoves(position));
    }

    if(part === "queen") {
        let queenPosibleMoves = []
        queenPosibleMoves.push(rookMoves(position));
        queenPosibleMoves.push(bishopMoves(position));
        console.log("QUEEN MOVES", queenPosibleMoves);
    }

    if(part === "king") {
        console.log("KING MOVES", kingMoves(position));
    }
return ""
}

console.log(move("pawn", ["A", 2], "white"))
console.log(move("pawn", ["A", 3], "white"))
console.log(move("pawn", ["A", 4], "white"))
console.log(move("pawn", ["A", 5], "white"))
console.log(move("pawn", ["B", 2], "white"))
console.log(move("pawn", ["E", 2], "white"))
console.log(move("pawn", ["F", 2], "white"))
console.log(move("pawn", ["D", 2], "white"))
console.log(move("rook", ["A", 1], "white"))
console.log(move("knight", ["B", 1], "white"))
console.log(move("bishop", ["C", 1], "white"))
console.log(move("king", ["E", 1], "white"))
console.log(move("queen", ["D", 1], "white"))
console.log(Board)



