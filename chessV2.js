let Board = {};
let letters = ["A","B","C","D","E","F","G","H"];

// WHITE PAWNS
for (let i = 0; i < 8; i++) {
  const file = String.fromCharCode(65 + i); // A-H
  Board[file + "2"] = { part: "pawn", color: "white" };
}

// BLACK PAWNS
for (let i = 0; i < 8; i++) {
  const file = String.fromCharCode(65 + i);
  Board[file + "7"] = { part: "pawn", color: "black" };
}

// ROOKS
Board["A1"] = { part: "rook", color: "white" };
Board["H1"] = { part: "rook", color: "white" };
Board["A8"] = { part: "rook", color: "black" };
Board["H8"] = { part: "rook", color: "black" };

// KNIGHTS
Board["B1"] = { part: "knight", color: "white" };
Board["G1"] = { part: "knight", color: "white" };
Board["B8"] = { part: "knight", color: "black" };
Board["G8"] = { part: "knight", color: "black" };

//BISHOPS
Board["C1"] = { part: "bishop", color: "white" };
Board["F1"] = { part: "bishop", color: "white" };
Board["C8"] = { part: "bishop", color: "black" };
Board["F8"] = { part: "bishop", color: "black" };

// QUEENS
Board["D1"] = { part: "queen", color: "white" };
Board["D8"] = { part: "queen", color: "black" };

// KINGS
Board["E1"] = { part: "king", color: "white" };
Board["E8"] = { part: "king", color: "black" };

function isOccupied(position) {
    return Board[position] != undefined;
}

function insideBoard(position) {
  let [col, row] = position;
  return letters.includes(col) && row >= 1 && row <= 8;
}

function cords([letter, number]) {
  return [letters.indexOf(letter), number - 1];
}

function changeCords([letter, number,]) {
  return letters[letter] + (number + 1);
}

function pawnEat(position) {

}

function pawnsMoves(position) {
    let actualPosition;
    let newPosition;
    let pawnsPosibleMoves = [];

    if (Board[position]) {
        actualPosition = cords(position);
        newPosition = [actualPosition[0], actualPosition[1] + 1];
        if (!isOccupied(newPosition)) {
            pawnsPosibleMoves.push(changeCords(newPosition));
        } 

        if (position[1] == 2){
            let especialPosition = [actualPosition[0], actualPosition[1] + 2];
            pawnsPosibleMoves.push(changeCords(especialPosition));
        }
        return pawnsPosibleMoves;
    }
}



function rookMoves(position) {
    let actualPosition;
    let newPosition;
    let rookPosibleMoves = [];

    if(Board[position]) {
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

    if(Board[position]) {
        actualPosition = cords(position);
        let position1 = [actualPosition[0] + 2, actualPosition[1] + 1]
        let position2 = [actualPosition[0] + 1, actualPosition[1] + 2]
        let position3 = [actualPosition[0] - 1, actualPosition[1] + 2]
        let position4 = [actualPosition[0] - 2, actualPosition[1] + 1]
        let position5 = [actualPosition[0] - 2, actualPosition[1] - 1]
        let position6 = [actualPosition[0] - 1, actualPosition[1] - 2]
        let position7 = [actualPosition[0] + 1, actualPosition[1] - 2]
        let position8 = [actualPosition[0] + 2, actualPosition[1] - 1]

        if (insideBoard(position1)) {
            knightPosibleMoves.push(changeCords(position1))
        }
        if (insideBoard(position2)) {
            knightPosibleMoves.push(changeCords(position2))
        }
        if (insideBoard(position3)) {
            knightPosibleMoves.push(changeCords(position3))
        }
        if (insideBoard(position4)) {
            knightPosibleMoves.push(changeCords(position4))
        }
        if (insideBoard(position5)) {
            knightPosibleMoves.push(changeCords(position5))
        }
        if (insideBoard(position6)) {
            knightPosibleMoves.push(changeCords(position6))
        }
        if (insideBoard(position7)) {
            knightPosibleMoves.push(changeCords(position7))
        }
        if (insideBoard(position8)) {
            knightPosibleMoves.push(changeCords(position8))
        }
    }
    return knightPosibleMoves
}




