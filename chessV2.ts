interface Piece {
    part: pieceType;
    color: color;
}

type boardType = {
    [letter: string]: {
        [number: number]: Piece | null;
    }     
};

type pieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
type color = "white" | "black";
type letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type position = [letter, rank];

let Board: boardType = {};
let letters = ["A","B","C","D","E","F","G","H"];

for (let i = 0; i < letters.length; i++) {
    let lett: string = letters[i]
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
Board["C"][8] = { part: "bishop", color: "black" };
Board["F"][8] = { part: "bishop", color: "black" };
Board["C"][1] = { part: "bishop", color: "white" };
Board["F"][1] = { part: "bishop", color: "white" };

// QUEENS
Board["D"][1] = { part: "queen", color: "white" };
Board["D"][8] = { part: "queen", color: "black" };

// KINGS
Board["E"][1] = { part: "king", color: "white" };
Board["E"][8] = { part: "king", color: "black" };


function isOccupied(position: position): boolean {
    return Board[position[0]][position[1]] != null;
}

function insideBoard(x: number, y: number): boolean {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}


function cords(lett: letter, num: rank): [number, number] {
    return [letters.indexOf(lett), num - 1];
}

function changeCords(lett: number, num: number): position {
    return [letters[lett] as letter, (num + 1) as rank];
}


function movePart(position: position, newPosition: position): void {
    Board[newPosition[0]][newPosition[1]] = Board[position[0]][position[1]]
    Board[position[0]][position[1]] = null
}

function pawnsEat(position: position): void {
    let actualPosition = cords(position[0], position[1]);
    let isWhite = false
    let isBlack = false
    if(Board[position[0]][position[1]]?.color === "white"){
        isWhite = true
    } else {
        isBlack = true
    }
    //Pawns eat for white pawns
    let pieceBL = Board[actualPosition[0]- 1][actualPosition[1] + 1] as Piece;
    let pieceBR = Board[actualPosition[0]+ 1][actualPosition[1] + 1] as Piece;
    if (pieceBL != null && pieceBL.color === "black" && isWhite && insideBoard(actualPosition[0]-1, actualPosition[1]+1)) {
        movePart(changeCords(actualPosition[0], actualPosition[1]), changeCords(actualPosition[0]-1, actualPosition[1]+1))
    }
    if (pieceBR != null && pieceBR.color === "black" && isWhite && insideBoard(actualPosition[0]+1, actualPosition[1]+1)) {
        movePart(changeCords(actualPosition[0], actualPosition[1]), changeCords(actualPosition[0]+1, actualPosition[1]+1))
    }

    //Pawns eat for black pawns
    let pieceWL = Board[actualPosition[0] - 1][actualPosition[1] - 1] as Piece
    let pieceWR = Board[actualPosition[0] + 1][actualPosition[1] - 1] as Piece
    if(pieceWL != null && pieceWL.color === "white" && isBlack && insideBoard(actualPosition[0]-1, actualPosition[1]-1)){
        movePart(changeCords(actualPosition[0], actualPosition[1]), changeCords(actualPosition[0]-1, actualPosition[1]-1))
    }
    if(pieceWR != null && pieceWR.color === "white" && isBlack && insideBoard(actualPosition[0]+1, actualPosition[1]-1)){
        movePart(changeCords(actualPosition[0], actualPosition[1]), changeCords(actualPosition[0]+1, actualPosition[1]-1))
    }

}

function pawnsMoves(position: position): Array<position> {
    let actualPosition: [number, number];
    let newPosition: [number, number];
    let especialPosition: [number, number];
    let pawnsPosibleMoves: Array<position> = [];

    if (Board[position[0]][position[1]]) {
        actualPosition = cords(position[0], position[1]);
        let piece = Board[position[0]][position[1]] as Piece;


        if (piece.color == "black") {
            newPosition = [actualPosition[0], actualPosition[1] - 1];
            if (actualPosition[1] == 7) {
                especialPosition = [actualPosition[0], actualPosition[1] - 2];
            }
        } else {
        newPosition = [actualPosition[0], actualPosition[1] + 1];
        }
        if (!isOccupied(changeCords(newPosition[0], newPosition[1]))) {
            pawnsPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            movePart(changeCords(actualPosition[0],actualPosition[1]), changeCords(newPosition[0], newPosition[1]));
        } 

        if (position[1] == 2){
            especialPosition = [actualPosition[0], actualPosition[1] + 2];
            pawnsPosibleMoves.push(changeCords(especialPosition[0], especialPosition[1]));
        }
    return pawnsPosibleMoves;
    }
    return pawnsPosibleMoves;
}

function rookMoves(position: position) {
    let actualPosition;
    let newPosition;
    let rookPosibleMoves = [];

    if(Board[position[0]][position[1]]) {
        actualPosition = cords(position[0], position[1]);

        //Movimiento vertical arriba
        for (let i = actualPosition[1] + 1; i < 8; i++) {
            newPosition = [actualPosition[0], i];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        //Movimiento vertical abajo
        for (let i = actualPosition[1] - 1;i >= 0; i--) {
            newPosition = [actualPosition[0], i];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        //Movimiento horizontal derecha
        for (let i = actualPosition[0] + 1;i < 8; i++) {
            newPosition = [i, actualPosition[1]];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        //Movimiento horizontal izquierda
        for (let i = actualPosition[0] - 1;i >= 0; i--) {
            newPosition = [i, actualPosition[1]];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }
    }
   
    return rookPosibleMoves;
 
}

function knightMoves(position: position) {
    let actualPosition;
    let knightPosibleMoves = [];

    if(Board[position[0]][position[1]]) {

        actualPosition = cords(position[0], position[1]);
        let position1 = [actualPosition[0] + 2, actualPosition[1] + 1];
        let position2 = [actualPosition[0] + 1, actualPosition[1] + 2];
        let position3 = [actualPosition[0] - 1, actualPosition[1] + 2];
        let position4 = [actualPosition[0] - 2, actualPosition[1] + 1];
        let position5 = [actualPosition[0] - 2, actualPosition[1] - 1];
        let position6 = [actualPosition[0] - 1, actualPosition[1] - 2];
        let position7 = [actualPosition[0] + 1, actualPosition[1] - 2];
        let position8 = [actualPosition[0] + 2, actualPosition[1] - 1];

        if (insideBoard(position1[0], position1[1])) {
            knightPosibleMoves.push(changeCords(position1[0], position1[1]));
        }
        if (insideBoard(position2[0], position2[1])) {
            knightPosibleMoves.push(changeCords(position2[0], position2[1]));
        }
        if (insideBoard(position3[0], position3[1])) {
            knightPosibleMoves.push(changeCords(position3[0], position3[1]));
        }
        if (insideBoard(position4[0], position4[1])) {
            knightPosibleMoves.push(changeCords(position4[0], position4[1]));
        }
        if (insideBoard(position5[0], position5[1])) {
            knightPosibleMoves.push(changeCords(position5[0], position5[1]));
        }
        if (insideBoard(position6[0], position6[1])) {
            knightPosibleMoves.push(changeCords(position6[0], position6[1]));
        }
        if (insideBoard(position7[0], position7[1])) {
            knightPosibleMoves.push(changeCords(position7[0], position7[1]));
        }
        if (insideBoard(position8[0], position8[1])) {
            knightPosibleMoves.push(changeCords(position8[0], position8[1]));
        }
    }
    return knightPosibleMoves;
}

function bishopMoves(position: position) {
    let actualPosition;
    let newPosition;
    let bishopPosibleMoves = [];

    if(Board[position[0]][position[1]]) {
        actualPosition = cords(position[0], position[1]);
        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] + i, actualPosition[1] + i];
            if (!insideBoard(newPosition[0], newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] - i, actualPosition[1] + i];
            if (!insideBoard(newPosition[0], newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] + i, actualPosition[1] - i];
            if (!insideBoard(newPosition[0],newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] - i, actualPosition[1] - i];
            if (!insideBoard(newPosition[0], newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }
    }
    return bishopPosibleMoves;
}

function kingMoves(position: position) {
    let actualPosition;
    let kingPosibleMoves = [];

    if(Board[position[0]][position[1]]) {

        actualPosition = cords(position[0], position[1]);
        let position1 = [actualPosition[0] - 1, actualPosition[1]];
        let position2 = [actualPosition[0] + 1, actualPosition[1]];
        let position3 = [actualPosition[0], actualPosition[1] + 1];
        let position4 = [actualPosition[0] - 1, actualPosition[1] + 1];
        let position5 = [actualPosition[0] - 1, actualPosition[1] - 1];
        let position6 = [actualPosition[0] + 1, actualPosition[1] - 1];
        let position7 = [actualPosition[0] + 1, actualPosition[1] + 1];
        let position8 = [actualPosition[0], actualPosition[1] - 1];

        if (insideBoard(position1[0], position1[1]) && !isOccupied(changeCords(position1[0], position1[1]))) {
            kingPosibleMoves.push(changeCords(position1[0], position1[1]));
        } 
        if (insideBoard(position2[0], position2[1]) && !isOccupied(changeCords(position2[0], position2[1]))) {
            kingPosibleMoves.push(changeCords(position2[0], position2[1]));
        }
        if (insideBoard(position3[0], position3[1]) && !isOccupied(changeCords(position3[0], position3[1]))) {
            kingPosibleMoves.push(changeCords(position3[0], position3[1]));
        }
        if (insideBoard(position4[0], position4[1]) && !isOccupied(changeCords(position4[0], position4[1]))) {
            kingPosibleMoves.push(changeCords(position4[0], position4[1]));
        }
        if (insideBoard(position5[0], position5[1]) && !isOccupied(changeCords(position5[0], position5[1]))) {
            kingPosibleMoves.push(changeCords(position5[0], position5[1]));
        }
        if (insideBoard(position6[0], position6[1]) && !isOccupied(changeCords(position6[0], position6[1]))) {
            kingPosibleMoves.push(changeCords(position6[0], position6[1]));
        }
        if (insideBoard(position7[0], position7[1]) && !isOccupied(changeCords(position7[0], position7[1]))) {
            kingPosibleMoves.push(changeCords(position7[0], position7[1]));
        }
        if (insideBoard(position8[0], position8[1]) && !isOccupied(changeCords(position8[0], position8[1]))) {
            kingPosibleMoves.push(changeCords(position8[0], position8[1]));
        }
    }
    return kingPosibleMoves;
}


function move(part: pieceType, position: position, color: color): string {
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